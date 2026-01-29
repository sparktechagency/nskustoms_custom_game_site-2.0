/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

// Function to update the HTML lang attribute
export function updateHtmlLangAttribute(langCode: string) {
  const htmlElement = document.documentElement;
  if (htmlElement) {
    htmlElement.setAttribute('lang', langCode);
  }
}

// Function to change the Google Translate language
export function changeGoogleTranslateLanguage(langCode: string) {
  // Set the googtrans cookie for Google Translate
  const domain = window.location.hostname;

  // Clear existing googtrans cookies
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;

  // Update HTML lang attribute before reload
  updateHtmlLangAttribute(langCode);

  if (langCode === "en") {
    // For English, just clear the cookie and reload
    window.location.reload();
    return;
  }

  // Set new googtrans cookie
  const googtransValue = `/en/${langCode}`;
  document.cookie = `googtrans=${googtransValue}; path=/;`;
  document.cookie = `googtrans=${googtransValue}; path=/; domain=${domain};`;
  document.cookie = `googtrans=${googtransValue}; path=/; domain=.${domain};`;

  // Reload to apply translation
  window.location.reload();
}

export function GoogleTranslateScript() {
  // Restore HTML lang attribute on initial load based on saved preference
  useEffect(() => {
    const savedLang = localStorage.getItem("currentLanguage");
    if (savedLang) {
      updateHtmlLangAttribute(savedLang);
    }
  }, []);

  useEffect(() => {
    // Patch DOM methods to prevent Google Translate conflicts
    const origRemove = Node.prototype.removeChild;
    const origAppend = Node.prototype.appendChild;
    const origInsert = Node.prototype.insertBefore;

    Node.prototype.removeChild = function (child: any) {
      try { return origRemove.call(this, child); }
      catch (e: any) { if (e.name === "NotFoundError") return child; throw e; }
    };
    Node.prototype.appendChild = function (child: any) {
      try { return origAppend.call(this, child); }
      catch (e: any) { if (e.name === "NotFoundError") return child; throw e; }
    };
    Node.prototype.insertBefore = function (newNode: any, ref: any) {
      try { return origInsert.call(this, newNode, ref); }
      catch (e: any) { if (e.name === "NotFoundError") return newNode; throw e; }
    };

    // Function to mark an element for translation
    function markElementForTranslation(element: HTMLElement) {
      if (element.tagName !== 'SCRIPT' && element.tagName !== 'STYLE') {
        element.setAttribute('translate', 'yes');

        // Specifically target buttons, links, and other interactive elements
        if (element.tagName === 'BUTTON' || element.tagName === 'A') {
          element.setAttribute('translate', 'yes');
        }

        // If element has no children but has text content, ensure it's marked
        if (element.children.length === 0 && element.textContent?.trim()) {
          element.setAttribute('translate', 'yes');
        }
      }
    }
    // Force Google Translate to re-translate content when DOM changes
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Mark new nodes for translation
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as HTMLElement;
              // Ensure all text elements are marked for translation
              markElementForTranslation(element);

              // Recursively mark child elements
              const walker = document.createTreeWalker(
                element,
                NodeFilter.SHOW_ELEMENT,
                {
                  acceptNode: function(): number {
                    return NodeFilter.FILTER_ACCEPT as number;
                  }
                }
              );
              let currentNode;
              while (currentNode = walker.nextNode()) {
                markElementForTranslation(currentNode as HTMLElement);
              }
            }
          });

          // Trigger translation of new content
          setTimeout(() => {
            if (window.google && window.google.translate && window.google.translate.TranslateService) {
              // Attempt to trigger re-translation
              const iframe = document.querySelector('iframe.goog-te-banner-frame') as HTMLElement;
              if (iframe) {
                iframe.style.display = 'none';
                setTimeout(() => {
                  iframe.style.display = '';
                }, 100);
              }
            }
          }, 100);
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let container = document.getElementById("google-translate-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "google-translate-container";
      document.body.insertBefore(container, document.body.firstChild);
    }

    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = () => {
      try {
        if (!window.google?.translate?.TranslateElement) return;
        const target = document.getElementById("google_translate_element");
        if (!target) return;
        target.innerHTML = "";
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,fr,pt,es",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      } catch (error) {
        console.debug("[Google Translate] Initialization error",error);
      }
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;

    // Add error handling for script loading failures
    script.onerror = () => {
      console.error("[Google Translate] Failed to load translation script. Translation features may be unavailable.");
    };

    script.onload = () => {
      // Verify that Google Translate initialized properly after script loads
      setTimeout(() => {
        if (!window.google?.translate?.TranslateElement) {
          console.error("[Google Translate] Script loaded but TranslateElement not available.");
        }
      }, 2000);
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div id="google_translate_element" style={{ display: "none" }} className="notranslate" />
  );
}
