// app/data/documentation.ts

export interface DocumentationSection {
  id: string;
  title: string;
  steps: {
    number: number;
    title: string;
    content: string;
  }[];
  securityTips?: {
    game: string;
    tips: string;
  }[];
}

export interface NavigationItem {
  id: string;
  title: string;
  href: string;
  children?: NavigationItem[];
}

export const documentationData: Record<string, DocumentationSection> = {
  "how-to-buy": {
    id: "how-to-buy",
    title: "How to buy an account?",
    steps: [
      {
        number: 1,
        title: "Choose Your Game",
        content:
          'Navigate to the "Accounts" section on the Auraboost website and select your game.',
      },
      {
        number: 2,
        title: "Select an Account",
        content:
          "Browse available accounts, check the title, description, and images to ensure it meets your needs.",
      },
      {
        number: 3,
        title: "Checkout",
        content:
          'Click "Checkout" to review the payment summary, including price, discounts, and any balance deductions. Pay any remaining amount using your chosen payment method.',
      },
      {
        number: 4,
        title: "Access Your Order",
        content:
          'After purchase, go to your Order Page and find your orders under "Purchased Orders".',
      },
      {
        number: 5,
        title: "Contact the Seller",
        content:
          "Message the seller in the order chat and wait for the account details. If delivery is instant, you'll receive the details immediately.",
      },
      {
        number: 6,
        title: "Confirm Ownership",
        content:
          'Once you\'ve verified the account matches the description, click "Order Received" to confirm ownership. For any issues, click "Raise a Dispute" for support.',
      },
      {
        number: 7,
        title: "Warranty",
        content:
          "Enjoy a 5-14 day warranty period (depending on the game). If any issues arise, contact support for a refund.",
      },
    ],
    securityTips: [
      {
        game: "Old School Runescape",
        tips: "Before making changes, ensure the account matches the description. If everything is correct, change the email, password, and billing info (if any). Avoid using common passwords. Confirm the purchase within the 5-day warranty period if everything checks out.",
      },
      {
        game: "World of Warcraft Classic",
        tips: 'Verify the account matches the description. Change the email, password, and billing info (if applicable), but do not alter the "Owner Name" or "Country". Log into Battle.net to confirm the new IP address. Confirm your purchase within the 5-day warranty period if the account matches the description.',
      },
      {
        game: "Fortnite",
        tips: "Avoid contacting Epic Games support from the new account, as account buying violates Fortnite's rules. Change the account email, password, and billing info. Secure the account with two-factor authentication and change the email password for added security. If you have any issues, reach out to the seller or Eldorado support.",
      },
    ],
  },
  "contact-us": {
    id: "contact-us",
    title: "Contact Us",
    steps: [
      {
        number: 1,
        title: "Visit Support Page",
        content:
          "Go to the Support section of our website to find all available contact options.",
      },
      {
        number: 2,
        title: "Choose Contact Method",
        content:
          "Select from live chat, email, or phone support based on your preference and urgency.",
      },
      {
        number: 3,
        title: "Provide Details",
        content:
          "Include your order ID, issue description, and any relevant screenshots to help us resolve your issue faster.",
      },
    ],
  },
  "become-partner": {
    id: "become-partner",
    title: "Become a Partner",
    steps: [
      {
        number: 1,
        title: "Review Requirements",
        content:
          "Check our partner requirements page to ensure you meet the criteria for becoming a partner.",
      },
      {
        number: 2,
        title: "Submit Application",
        content:
          "Fill out the partner application form with your business information and experience.",
      },
      {
        number: 3,
        title: "Wait for Approval",
        content:
          "Our team will review your application and contact you within 3-5 business days.",
      },
    ],
  },
};

export const navigationItems: NavigationItem[] = [
  {
    id: "help-center",
    title: "Help Center",
    href: "/help-center",
    children: [
      {
        id: "i-am-buy",
        title: "I am Buying",
        href: "/help-center/how-to-buy",
      },
      {
        id: "i-am-sel",
        title: "I am Selling",
        href: "/help-center/how-to-buy",
      },
      {
        id: "aura-boost",
        title: "AuraBoost Account",
        href: "/help-center/become-partner",
      },
      {
        id: "faq",
        title: "Faq",
        href: "/help-center/tradeshield-buying",
      },
    ],
  },
  {
    id: "contact-us",
    title: "Contact-Us",
    href: "/contact",
    children: [],
  },
  {
    id: "become-partner",
    title: "Become a Partner",
    href: "/help-center/become-partner",
    children: [],
  },
  {
    id: "tradeshield-buying",
    title: "TradeShield (Buying)",
    href: "/help-center/tradeshield-buying",
    children: [],
  },
  {
    id: "tradeshield-selling",
    title: "TradeShield (Selling)",
    href: "/help-center/tradeshield-selling",
    children: [],
  },
  {
    id: "deposited",
    title: "Deposited",
    href: "/help-center/deposited",
    children: [],
  },
  {
    id: "withdrawal",
    title: "Withdrawal",
    href: "/help-center/withdrawal",
    children: [],
  },
  {
    id: "account-seller-rules",
    title: "Account Seller Rules",
    href: "/help-center/account-seller-rules",
    children: [],
  },
  {
    id: "seller-rules",
    title: "Seller Rules",
    href: "/help-center/seller-rules",
    children: [],
  },
  {
    id: "changing-username",
    title: "Changing Username",
    href: "/help-center/changing-username",
    children: [],
  },
  {
    id: "fees",
    title: "Fees",
    href: "/help-center/fees",
    children: [],
  },
  {
    id: "refund-policy",
    title: "Refund Policy",
    href: "/help-center/refund-policy",
    children: [],
  },
];
