// app/data/documentation.ts

export interface DocumentationSection {
  id: string;
  title: string;
  description: string;
  steps: {
    number: number;
    title: string;
    content: string;
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
    title: "How to Buy a Boosting Service on Auraboost",
    description:
      "Step-by-step guide on how to purchase a boosting service on Auraboost. Learn how to choose your game, select a booster, checkout securely, and get your rank upgraded fast.",
    steps: [
      {
        number: 1,
        title: "Choose Your Game & Service",
        content:
          'Start by navigating to the Auraboost marketplace and selecting the game you want boosted. We currently support League of Legends, Valorant, and other popular competitive titles. Browse through available boosting services — whether it\'s ranked climbing, placement matches, or specific tier targets. Use the filters to narrow down by game, rank range, and price to find exactly what you need.',
      },
      {
        number: 2,
        title: "Review Booster Profiles",
        content:
          "Before placing an order, take a moment to review the booster's profile. Check their completion rate, average delivery time, customer ratings, and verified rank credentials. Each booster on Auraboost goes through a rigorous verification process, so you can trust that you're working with a skilled professional. Look at recent reviews from other buyers to get a feel for their service quality and communication style.",
      },
      {
        number: 3,
        title: "Place Your Order & Checkout",
        content:
          'Once you\'ve found the right booster and service, click "Order Now" to proceed to checkout. You\'ll see a detailed payment summary including the base price, any applicable discounts or promo codes, and wallet balance deductions. Auraboost accepts Visa, Mastercard, American Express, Discover, Apple Pay, and Google Pay. All transactions are processed through our secure payment gateway with full encryption.',
      },
      {
        number: 4,
        title: "Track Your Order in Real Time",
        content:
          'After your purchase is confirmed, head to your Dashboard and find your order under "My Orders." You\'ll be able to track the progress of your boost in real time. Watch as your rank climbs with live status updates, estimated completion times, and milestone notifications. You\'ll know exactly where things stand at every step of the process.',
      },
      {
        number: 5,
        title: "Communicate with Your Booster",
        content:
          "Use the built-in order chat to communicate directly with your booster. You can discuss scheduling preferences, specific champion or agent requests, and any other requirements. Our boosters are responsive and professional — most reply within minutes. If your order includes instant delivery, you'll receive the details right away without any waiting.",
      },
      {
        number: 6,
        title: "Confirm Completion & Leave a Review",
        content:
          'Once your boost is complete and you\'ve verified the results match what was promised, click "Order Received" to confirm completion. This releases the payment to the booster. If anything doesn\'t look right, you can click "Raise a Dispute" and our support team will investigate immediately. After confirming, we encourage you to leave an honest review to help other buyers make informed decisions.',
      },
      {
        number: 7,
        title: "RankGuard Warranty Protection",
        content:
          "Every purchase on Auraboost is backed by our RankGuard warranty. You'll enjoy a 5-14 day protection period (depending on the game) after your order is completed. If you experience any rank loss or account issues during this window that are related to the boost, contact our support team and we'll make it right — whether that's a re-boost or a full refund. Your investment is always protected.",
      },
    ],
  },
  "how-to-sell": {
    id: "how-to-sell",
    title: "How to Sell & Boost on Auraboost",
    description:
      "Complete guide for becoming a verified booster on Auraboost. Learn how to create your seller account, list services, receive orders, deliver boosts, and earn money.",
    steps: [
      {
        number: 1,
        title: "Apply to Become a Verified Booster",
        content:
          "Getting started as a seller on Auraboost begins with our verification process. Sign up for a seller account and submit your application with proof of your in-game rank and experience. We review every application carefully to ensure our marketplace only features top-tier talent. You'll need to provide your current rank screenshots, match history, and agree to our seller code of conduct. The review process typically takes 1-3 business days.",
      },
      {
        number: 2,
        title: "Create Your Service Listings",
        content:
          "Once approved, it's time to set up your boosting services. Create detailed listings that showcase what you offer — whether it's ranked climbing, placement matches, coaching, or specific achievement unlocks. Write compelling descriptions that highlight your strengths, set competitive pricing based on rank tiers, and upload screenshots of your achievements. The more detailed and professional your listings, the more orders you'll attract.",
      },
      {
        number: 3,
        title: "Configure Your Availability & Specializations",
        content:
          "Set up your availability schedule so buyers know when you're online and ready to boost. Specify the games and roles you specialize in, your peak hours, and your preferred communication methods. Auraboost's matching algorithm uses this information to connect you with the right buyers. Sellers who keep their availability up to date consistently receive more orders and build stronger reputations.",
      },
      {
        number: 4,
        title: "Accept & Manage Incoming Orders",
        content:
          "When a buyer places an order for your service, you'll receive an instant notification via email and in-app alert. Review the order details — including the buyer's current rank, target rank, and any special requests — then accept the job to get started. Use the order management dashboard to track all your active, pending, and completed orders in one place. Respond to buyers quickly; fast response times lead to better ratings.",
      },
      {
        number: 5,
        title: "Deliver the Boost & Communicate Progress",
        content:
          "Execute the boost professionally and efficiently. Keep the buyer informed throughout the process by sending regular updates via the order chat — share screenshots of rank progress, notable wins, and milestone achievements. Transparency builds trust and leads to repeat customers. Always follow Auraboost's boosting guidelines: no cheats, no unauthorized software, and treat every buyer's account with the utmost care and respect.",
      },
      {
        number: 6,
        title: "Get Paid & Grow Your Reputation",
        content:
          "Once the buyer confirms the order is complete, your earnings are instantly credited to your Auraboost wallet. You can withdraw funds at any time via bank transfer or other supported payout methods. As you complete more orders and collect positive reviews, your seller level increases — unlocking lower commission rates, priority listing placement, and access to higher-value orders. Top boosters on Auraboost earn consistently by delivering quality service.",
      },
    ],
  },
  "auraboost-account": {
    id: "auraboost-account",
    title: "Your Auraboost Account — Setup & Management",
    description:
      "Everything you need to know about setting up and managing your Auraboost account. Create your profile, secure your account, manage payments, and customize your preferences.",
    steps: [
      {
        number: 1,
        title: "Creating Your Auraboost Account",
        content:
          "Getting started is simple. Visit auraboost.gg and click \"Sign Up\" in the top right corner. Enter your email address, choose a unique username, and create a strong password (we recommend at least 12 characters with a mix of letters, numbers, and symbols). You'll receive a verification email — click the link to activate your account. Once verified, you're ready to explore the marketplace, place orders, or apply to become a seller.",
      },
      {
        number: 2,
        title: "Setting Up Your Profile",
        content:
          "A complete profile helps build trust across the platform. Head to Account Settings to add your display name, upload a profile avatar, and write a short bio. If you're a buyer, a complete profile helps boosters feel confident working with you. If you're a seller, it's essential — buyers review your profile before placing orders. You can also link your gaming accounts to display your verified ranks and achievements directly on your profile.",
      },
      {
        number: 3,
        title: "Account Security & Two-Factor Authentication",
        content:
          "We take security seriously. Enable two-factor authentication (2FA) from your Account Settings to add an extra layer of protection. With 2FA enabled, you'll need both your password and a verification code from your authenticator app to log in. Never share your login credentials with anyone, use a unique password for Auraboost, and be cautious of phishing attempts. If you suspect unauthorized access, change your password immediately and contact our support team.",
      },
      {
        number: 4,
        title: "Managing Payment Methods & Wallet",
        content:
          "Add and manage your payment methods from the Wallet section. Auraboost supports Visa, Mastercard, American Express, Discover, Apple Pay, and Google Pay. You can also deposit funds into your Auraboost wallet for faster checkouts and keep track of all your transactions in the payment history. For sellers, configure your payout preferences to receive earnings via your preferred withdrawal method.",
      },
      {
        number: 5,
        title: "Notification Preferences & Settings",
        content:
          "Stay informed without being overwhelmed. Customize your notification preferences to control which alerts you receive — order updates, new messages, promotional offers, and security alerts. You can choose to receive notifications via email, in-app push notifications, or both. Fine-tune your preferences anytime from Account Settings > Notifications to match your workflow.",
      },
    ],
  },
  faq: {
    id: "faq",
    title: "Frequently Asked Questions — Auraboost Help Center",
    description:
      "Find answers to the most common questions about Auraboost. Learn about our boosting services, account safety, payment options, delivery times, refund policy, and more.",
    steps: [
      {
        number: 1,
        title: "What is Auraboost and how does it work?",
        content:
          "Auraboost is a trusted game boosting marketplace that connects players with verified, professional boosters. Our platform operates as a secure middleman — buyers place orders, payments are held in escrow, boosters deliver the service, and funds are released only after the buyer confirms satisfaction. We support League of Legends, Valorant, and other competitive games. Every transaction is protected by our RankGuard warranty, and our support team is available to resolve any issues that arise.",
      },
      {
        number: 2,
        title: "Is using a boosting service safe for my account?",
        content:
          "Account safety is our top priority. All Auraboost boosters are verified professionals who follow strict security protocols. We use VPN protection to match your region, avoid suspicious play patterns, and never use cheats or unauthorized software. Our boosters treat your account credentials with complete confidentiality. Additionally, our RankGuard warranty covers you against any account-related issues during and after the boost. Thousands of customers have used Auraboost without any account problems.",
      },
      {
        number: 3,
        title: "How long does a typical boost take?",
        content:
          "Delivery times vary based on the type of boost, the rank gap, and the current queue. Most standard boosts are started within 1-2 hours of order acceptance and completed within 1-5 days. Division-to-division climbs are typically faster, while larger rank jumps may take longer. You can track your boost in real time from your dashboard and communicate with your booster for estimated completion times. Some services also offer express delivery for faster turnaround.",
      },
      {
        number: 4,
        title: "What payment methods are accepted?",
        content:
          "Auraboost accepts a wide range of payment methods to make checkout convenient. You can pay with Visa, Mastercard, American Express, Discover, Apple Pay, and Google Pay. All payments are processed through our PCI-compliant payment gateway with full SSL encryption. You can also use your Auraboost wallet balance, which can be topped up anytime. We never store your full card details — your financial information is always secure.",
      },
      {
        number: 5,
        title: "What if I'm not satisfied with the service?",
        content:
          "Your satisfaction is guaranteed. If a booster fails to deliver the promised service, the results don't match the description, or there are any issues during the boost, you can raise a dispute directly from your order page. Our dedicated support team reviews every dispute thoroughly, examining evidence from both sides before making a fair decision. Eligible orders receive a full refund or a free re-boost. We also encourage you to communicate any concerns with your booster first, as most issues can be resolved quickly through the order chat.",
      },
      {
        number: 6,
        title: "Can I become a booster on Auraboost?",
        content:
          "Absolutely! If you're a skilled player with a proven track record, we'd love to have you on the platform. Apply through our Seller Verification page by submitting your rank proof, match history, and gaming credentials. Our team reviews every application to maintain the highest quality standards. Once approved, you can create service listings, set your own prices, and start earning. Top boosters on Auraboost enjoy competitive commission rates, priority placement, and a growing base of loyal customers.",
      },
    ],
  },
  "tradeshield-buying": {
    id: "tradeshield-buying",
    title: "RankGuard Buyer Protection — How Your Purchase is Protected",
    description:
      "Learn how Auraboost's RankGuard buyer protection works. Understand escrow payments, warranty periods, dispute resolution, and how we keep every purchase safe and secure.",
    steps: [
      {
        number: 1,
        title: "What is RankGuard Buyer Protection?",
        content:
          "RankGuard is Auraboost's comprehensive buyer protection program designed to make every purchase risk-free. When you place an order, your payment is held securely in escrow — meaning the booster doesn't receive the funds until you confirm that the service was delivered as promised. This system ensures that your money is always protected, and you have full control over when payment is released. RankGuard covers you against non-delivery, service misrepresentation, and account-related issues.",
      },
      {
        number: 2,
        title: "Secure Escrow Payment System",
        content:
          "Here's how the escrow process works: when you checkout, your payment is held by Auraboost in a secure escrow account. The booster can see that the order is funded and begins working on your boost. Throughout the process, you can track progress and communicate with the booster. Only when you click \"Order Received\" to confirm satisfaction are the funds released to the booster. If anything goes wrong before you confirm, your payment remains protected and can be refunded.",
      },
      {
        number: 3,
        title: "Warranty Period — 5 to 14 Days of Coverage",
        content:
          "After you confirm your order as complete, RankGuard continues to protect you with a warranty period lasting 5 to 14 days depending on the game and service type. During this window, if you experience any issues related to the completed boost — such as unexpected rank loss, account irregularities, or service-related problems — you can contact our support team for resolution. This extended coverage gives you peace of mind long after the boost is finished.",
      },
      {
        number: 4,
        title: "How to File a Dispute",
        content:
          "If the delivered service doesn't match what was described, or if the booster fails to complete the order, you can file a dispute directly from your order page by clicking \"Raise a Dispute.\" Provide a clear description of the issue along with any supporting evidence — screenshots, chat logs, or rank history. Our support team reviews every dispute within 24-48 hours, gathering input from both buyer and seller before making a fair and informed decision. Eligible disputes result in a full refund or a complimentary re-boost.",
      },
      {
        number: 5,
        title: "What RankGuard Covers",
        content:
          "RankGuard protects you in the following scenarios: the booster doesn't deliver the service within the agreed timeframe, the final result doesn't match the service description, your account experiences issues directly caused by the boosting process, or the booster becomes unresponsive and abandons the order. In all these cases, you're entitled to a full refund. We've designed RankGuard so that buyers can shop on Auraboost with complete confidence.",
      },
    ],
  },
  "tradeshield-selling": {
    id: "tradeshield-selling",
    title: "RankGuard Seller Protection — Secure Your Earnings",
    description:
      "Understand how RankGuard protects sellers on Auraboost. Learn about payment security, dispute handling, chargeback protection, and maintaining your seller standing.",
    steps: [
      {
        number: 1,
        title: "How RankGuard Protects Sellers",
        content:
          "RankGuard isn't just for buyers — it's designed to protect sellers too. Once a buyer confirms that your service has been delivered successfully, your earnings are locked in and released to your wallet. You're protected against false disputes, fraudulent chargeback attempts, and bad-faith claims. Auraboost's escrow system ensures that funded orders have verified payments before you start working, so you never risk completing a boost for an unfunded order.",
      },
      {
        number: 2,
        title: "Delivering Your Service with Documentation",
        content:
          "The best way to protect yourself is to deliver excellent service with thorough documentation. Always provide before-and-after screenshots in the order chat showing rank progress. Send regular updates during the boost so the buyer can see the work being done. Keep all communication within Auraboost's order chat — this creates a verifiable record that our support team can reference if a dispute ever arises. Well-documented orders are almost never disputed.",
      },
      {
        number: 3,
        title: "Handling & Responding to Disputes",
        content:
          "If a buyer files a dispute, don't panic — our process is fair and evidence-based. You'll be notified immediately and given the opportunity to present your side with supporting evidence. Respond promptly and professionally, providing screenshots, chat history, and any other proof of delivery. Our support team evaluates both sides objectively before making a decision. Sellers who document their work thoroughly and communicate professionally win the vast majority of disputes.",
      },
      {
        number: 4,
        title: "Chargeback Protection",
        content:
          "Auraboost handles payment processing and chargeback disputes on your behalf. If a buyer attempts a fraudulent chargeback after confirming receipt of your service, our team contests it using the transaction records and delivery evidence. Sellers are not held liable for fraudulent chargebacks when they've delivered the service as described and followed our guidelines. Your earnings remain safe in your wallet regardless of external payment disputes.",
      },
      {
        number: 5,
        title: "Building & Maintaining Good Standing",
        content:
          "Sellers who consistently deliver quality service and maintain high ratings enjoy significant benefits on the platform. Good standing unlocks lower commission rates, priority search placement, featured seller badges, and access to premium high-value orders. Keep your completion rate above 95%, respond to messages within 30 minutes during active hours, and maintain a rating above 4.5 stars to stay in the top tier. Your reputation is your greatest asset on Auraboost.",
      },
    ],
  },
  deposited: {
    id: "deposited",
    title: "Deposits — Adding Funds to Your Auraboost Wallet",
    description:
      "Learn how to deposit funds into your Auraboost wallet. Understand supported payment methods, processing times, deposit limits, and how to use your wallet balance for purchases.",
    steps: [
      {
        number: 1,
        title: "How to Add Funds to Your Wallet",
        content:
          "Adding funds to your Auraboost wallet is quick and straightforward. Navigate to the Wallet section from your dashboard sidebar and click \"Deposit.\" Enter the amount you'd like to add and select your preferred payment method. We support Visa, Mastercard, American Express, Discover, Apple Pay, and Google Pay. Confirm the transaction, and your funds will appear in your wallet balance almost immediately. Having a wallet balance makes future checkouts faster and more convenient.",
      },
      {
        number: 2,
        title: "Instant Processing & Confirmation",
        content:
          "Most deposits are processed instantly. As soon as your payment is authorized, the funds are credited to your Auraboost wallet and you'll receive a confirmation notification via email and in-app alert. In rare cases where there's a processing delay (usually due to bank verification), deposits may take up to a few minutes. If your deposit hasn't appeared within 10 minutes, check your payment method for any issues and contact our support team for assistance.",
      },
      {
        number: 3,
        title: "Using Your Wallet Balance for Purchases",
        content:
          "Your wallet balance is automatically applied during checkout. When you place an order, the system first deducts from your wallet balance before charging your payment method for any remaining amount. This means you can pre-load your wallet and enjoy seamless, one-click checkouts. You can also split payments between your wallet balance and a card if you don't have enough funds to cover the full order. Your wallet balance never expires and is always available for use.",
      },
      {
        number: 4,
        title: "Deposit Limits & Verification Levels",
        content:
          "Deposit limits depend on your account verification level and payment method. Standard accounts have a daily deposit limit that can be increased by completing identity verification. Higher verification levels unlock larger deposit amounts and additional payment options. Check your Wallet settings page for your current limits. If you need to make a deposit that exceeds your limit, contact support to discuss verification options that can increase your threshold.",
      },
      {
        number: 5,
        title: "Transaction History & Receipts",
        content:
          "Every deposit is recorded in your transaction history with a unique reference ID, timestamp, amount, payment method, and status. Access your full transaction history from Wallet > Transactions. You can filter by date range, transaction type, and status. Need a receipt for a specific deposit? Click on any transaction to view and download a detailed receipt. This makes it easy to keep track of all your financial activity on the platform.",
      },
    ],
  },
  withdrawal: {
    id: "withdrawal",
    title: "Withdrawals — Cash Out Your Auraboost Earnings",
    description:
      "Complete guide to withdrawing funds from your Auraboost wallet. Learn about payout methods, processing times, minimum amounts, fees, and how to set up your withdrawal preferences.",
    steps: [
      {
        number: 1,
        title: "How to Request a Withdrawal",
        content:
          "Ready to cash out your earnings? Navigate to your Wallet and click \"Withdraw.\" Enter the amount you'd like to withdraw, select your preferred payout method, and confirm the request. You'll see a summary of the withdrawal amount, any applicable fees, and the estimated arrival time before you confirm. Once submitted, your withdrawal enters our processing queue and you'll receive status updates via email and in-app notifications until the funds arrive.",
      },
      {
        number: 2,
        title: "Supported Payout Methods",
        content:
          "Auraboost supports multiple withdrawal methods to suit your needs. Choose from bank transfer (ACH/SEPA), and other supported payout options depending on your region. Each method has different processing times and fee structures. Set up your preferred payout details in Wallet > Payout Settings — you can save multiple payout methods and choose which one to use for each withdrawal. Make sure your payout information is accurate to avoid processing delays.",
      },
      {
        number: 3,
        title: "Processing Times",
        content:
          "Withdrawal processing times depend on your chosen payout method. Bank transfers typically take 1-3 business days for domestic transfers and 3-5 business days for international transfers. You'll receive a notification when your withdrawal is initiated, when it's being processed, and when it's completed. Please note that processing times are measured in business days — weekends and bank holidays may extend the timeline slightly.",
      },
      {
        number: 4,
        title: "Minimum Withdrawal & Fees",
        content:
          "A minimum withdrawal amount applies to ensure efficient processing. Check your Wallet page for the current minimum threshold, which varies by payout method. Withdrawal fees also depend on your chosen method and may include a small processing fee. All applicable fees are clearly displayed before you confirm your withdrawal — there are no hidden charges. Higher-level sellers may qualify for reduced fees based on their total sales volume.",
      },
      {
        number: 5,
        title: "Withdrawal Security & Verification",
        content:
          "To protect your funds, all withdrawals require identity verification. If you haven't completed verification yet, you'll be prompted to do so before your first withdrawal. For added security, large withdrawals may require additional confirmation via email or two-factor authentication. If you notice any unauthorized withdrawal attempts, contact our support team immediately. We take financial security seriously and have multiple safeguards in place to protect your earnings.",
      },
    ],
  },
  "account-seller-rules": {
    id: "account-seller-rules",
    title: "Account Seller Rules & Guidelines",
    description:
      "Official rules and guidelines for account sellers on Auraboost. Understand listing requirements, delivery standards, prohibited activities, and how to maintain good standing.",
    steps: [
      {
        number: 1,
        title: "Accurate & Honest Listings Are Required",
        content:
          "All account listings on Auraboost must be 100% accurate and truthful. This means including the correct rank, level, champion/agent pool, skins inventory, and any other relevant details. Upload clear, recent screenshots that verify the account's current state. Misleading listings — such as inflated ranks, fake screenshots, or omitting important details like previous bans — will result in listing removal, penalties, and possible account suspension. Honesty builds trust and leads to better sales.",
      },
      {
        number: 2,
        title: "Timely Delivery & Communication Standards",
        content:
          "Sellers must deliver account credentials or complete the service within the agreed timeframe. For account sales, delivery should happen within 24 hours of the buyer's payment unless otherwise specified in the listing. Communicate proactively with buyers through the order chat — send updates, respond to questions within 2 hours during your active hours, and notify buyers immediately if any delays occur. Repeated late deliveries or unresponsive behavior leads to negative reviews and seller penalties.",
      },
      {
        number: 3,
        title: "Strictly No Account Recovery Attempts",
        content:
          "Attempting to recover, reclaim, or access a sold account after the transaction is complete is the most serious violation on Auraboost. This includes submitting recovery requests to the game publisher, changing passwords after delivery, or using previously linked email addresses to regain access. Any account recovery attempt results in an immediate permanent ban from the platform, forfeiture of all pending and wallet earnings, and potential legal action. Once an account is sold, it belongs entirely to the buyer.",
      },
      {
        number: 4,
        title: "Professional Communication & Conduct",
        content:
          "Maintain professional, respectful, and helpful communication with all buyers. This includes responding promptly to messages, answering questions about your listings honestly, and guiding buyers through the account transfer process. Abusive language, threats, harassment, or discriminatory behavior of any kind is not tolerated and will result in immediate suspension. Remember that your communication style directly impacts your ratings and repeat business — professional sellers consistently outperform others.",
      },
      {
        number: 5,
        title: "Compliance & Account Integrity",
        content:
          "Sellers must ensure that all accounts listed for sale are legitimately owned and were not obtained through hacking, phishing, or other unauthorized means. Selling stolen, compromised, or fraudulently obtained accounts is strictly prohibited and will result in a permanent ban. All accounts must comply with the respective game's terms of service to the extent applicable. Auraboost reserves the right to verify account ownership and remove listings that raise integrity concerns.",
      },
    ],
  },
  "seller-rules": {
    id: "seller-rules",
    title: "Seller Rules — Auraboost Booster Code of Conduct",
    description:
      "Official rules and code of conduct for boosters on Auraboost. Understand eligibility, service quality standards, prohibited activities, pricing guidelines, and account safety requirements.",
    steps: [
      {
        number: 1,
        title: "Eligibility & Verification Requirements",
        content:
          "To sell boosting services on Auraboost, you must be at least 18 years old and complete our seller verification process. This includes submitting valid identification, proof of your in-game rank (Diamond+ or equivalent), and your gaming history. Verification ensures that only skilled, trustworthy players can offer services on our platform. Your verification status is reviewed periodically, and you may be asked to re-verify your rank if it changes significantly. Maintaining an active, verified status is essential to keeping your seller account in good standing.",
      },
      {
        number: 2,
        title: "Service Quality & Delivery Standards",
        content:
          "Deliver all services exactly as described in your listings — no exceptions. If you list a service as \"Diamond to Master in 5 days,\" that's the commitment you're making to the buyer. Maintain a completion rate above 95% and an average rating above 4.0 stars to remain in good standing. If you cannot complete an order for any reason, notify the buyer and Auraboost support immediately rather than going silent. Quality and reliability are the foundation of a successful boosting career on our platform.",
      },
      {
        number: 3,
        title: "Prohibited Activities — Zero Tolerance",
        content:
          "The following activities are strictly prohibited and will result in immediate suspension or permanent ban: using cheats, hacks, exploits, scripts, or any unauthorized third-party software during boosting; account sharing with other boosters without buyer consent; intentionally losing games or manipulating matches; boosting on a buyer's account while they are also playing; and performing any action that could result in the buyer's account being banned. Auraboost employs detection systems and regular audits to enforce these rules.",
      },
      {
        number: 4,
        title: "Fair Pricing & Market Guidelines",
        content:
          "Set fair, competitive prices for your services that reflect the actual effort and time required. Artificially inflating prices, creating fake urgency, or engaging in price manipulation is not allowed. Do not undercut other sellers with unsustainably low prices intended to monopolize orders — this harms the marketplace ecosystem. Pricing should be transparent with no hidden fees or surprise charges. If you offer discounts or promotions, honor them as advertised. Auraboost monitors pricing patterns and may intervene if manipulation is detected.",
      },
      {
        number: 5,
        title: "Account Safety & Confidentiality",
        content:
          "When a buyer entrusts you with their account, you accept full responsibility for its safety during the boost. Never share buyer account credentials with anyone — including other boosters, friends, or third parties. Do not make unauthorized purchases, change account settings, access personal information, or engage in any activity beyond the scope of the ordered service. Use secure connections and follow Auraboost's recommended security practices. Any breach of account confidentiality is a serious violation that will result in permanent removal from the platform.",
      },
      {
        number: 6,
        title: "Dispute Resolution & Cooperation",
        content:
          "If a buyer raises a dispute, cooperate fully with Auraboost's support team. Provide all requested evidence promptly — including screenshots, match history, and chat logs. Do not attempt to intimidate, bribe, or pressure a buyer into withdrawing a dispute. Do not retaliate against a buyer who files a legitimate complaint. Our dispute resolution process is designed to be fair to both parties, and sellers who cooperate transparently are treated accordingly. Refusing to cooperate with a dispute investigation may result in an automatic ruling in the buyer's favor.",
      },
    ],
  },
  "changing-username": {
    id: "changing-username",
    title: "How to Change Your Username on Auraboost",
    description:
      "Step-by-step guide to changing your Auraboost username. Learn how to update your display name, username restrictions, and what to know before making the change.",
    steps: [
      {
        number: 1,
        title: "Navigate to Your Account Settings",
        content:
          "Log into your Auraboost account and click on your profile avatar in the top right corner, then select \"Account Settings\" from the dropdown menu. Alternatively, you can access it directly from your dashboard sidebar by clicking \"Account Settings.\" This is your central hub for managing all aspects of your Auraboost profile, including your username, display name, email, password, and notification preferences.",
      },
      {
        number: 2,
        title: "Edit Your Username",
        content:
          "In the Profile section of Account Settings, you'll see your current username displayed. Click the edit icon next to it and enter your new desired username. The system will instantly check availability — if your chosen username is already taken, you'll be prompted to try a different one. Your username is how other users identify you across the platform, so choose something memorable and professional, especially if you're a seller.",
      },
      {
        number: 3,
        title: "Username Rules & Restrictions",
        content:
          "Usernames on Auraboost must follow these guidelines: between 3 and 20 characters long, containing only letters, numbers, underscores, and hyphens. Usernames are case-insensitive (\"ProBooster\" and \"probooster\" are treated as the same). Offensive, discriminatory, misleading, or impersonating usernames are not permitted and will be flagged for review. Usernames that impersonate Auraboost staff, other users, or public figures will be rejected. You may change your username once every 30 days.",
      },
      {
        number: 4,
        title: "Save & Confirm Your New Username",
        content:
          "Once you've entered a valid, available username, click \"Save Changes\" to confirm. Your new username takes effect immediately across the entire platform — in your profile, order chats, reviews, and listings. Other users will see your new username right away. Note that your previous username becomes available for others to claim after 30 days. If you're a seller with active listings, your listings will automatically update to reflect your new username.",
      },
    ],
  },
  fees: {
    id: "fees",
    title: "Auraboost Fees — Transparent Pricing Explained",
    description:
      "Complete breakdown of all fees on Auraboost. Understand buyer service fees, seller commission rates, withdrawal fees, and our commitment to transparent, no-hidden-charge pricing.",
    steps: [
      {
        number: 1,
        title: "Buyer Service Fees",
        content:
          "Buyers may be subject to a small service fee on each transaction that helps maintain the platform, fund buyer protection programs, and support our 24/7 customer service team. The exact fee percentage is clearly displayed during checkout before you confirm your purchase — you'll always know the total cost upfront. Service fees vary slightly based on the order value and payment method. Wallet-funded purchases may have reduced or waived service fees as an incentive for using your Auraboost balance.",
      },
      {
        number: 2,
        title: "Seller Commission Rates",
        content:
          "Auraboost charges a commission on each completed sale, which covers payment processing, platform maintenance, marketing, and seller protection services. Commission rates are tiered based on your seller level, which increases with your total sales volume and rating. New sellers start at the standard rate, while top-performing sellers can unlock significantly lower commissions. Your current commission rate is always visible in your Seller Dashboard. As your sales grow, you'll automatically qualify for better rates.",
      },
      {
        number: 3,
        title: "Withdrawal & Payout Fees",
        content:
          "A small processing fee may apply when withdrawing funds from your Auraboost wallet. The fee amount varies depending on your chosen payout method — bank transfers typically have the lowest fees, while other methods may have slightly higher processing costs. All withdrawal fees are clearly displayed before you confirm the transaction. High-volume sellers may qualify for reduced withdrawal fees based on their monthly payout amount. Check your Wallet settings for your current fee schedule.",
      },
      {
        number: 4,
        title: "No Hidden Charges — Ever",
        content:
          "Auraboost is committed to complete fee transparency. There are no hidden charges, surprise deductions, subscription fees, or maintenance costs. Every fee is clearly displayed before you complete any transaction. We don't charge inactivity fees, listing fees, or account maintenance fees. What you see at checkout is exactly what you pay. If you ever notice a charge you don't recognize, contact our support team immediately and we'll investigate and resolve it.",
      },
      {
        number: 5,
        title: "Promotions, Discounts & Fee Waivers",
        content:
          "Auraboost regularly offers promotions that can reduce or eliminate fees for both buyers and sellers. Look for seasonal sales, referral bonuses, first-order discounts, and loyalty rewards. Sellers can earn fee reductions by maintaining high ratings and completing milestone order counts. Sign up for email notifications to stay informed about current promotions. You can also check the Promotions section on your dashboard for any active offers that apply to your account.",
      },
    ],
  },
  "refund-policy": {
    id: "refund-policy",
    title: "Auraboost Refund Policy — Fair & Transparent",
    description:
      "Understand Auraboost's refund policy. Learn when you're eligible for a refund, how to request one, the review process, refund timelines, and what cases are not eligible.",
    steps: [
      {
        number: 1,
        title: "When You're Eligible for a Refund",
        content:
          "Auraboost provides refunds in the following situations: the booster fails to deliver the service within the agreed timeframe and becomes unresponsive; the delivered service does not match the listing description (e.g., wrong rank achieved, incomplete order); the seller fails to respond to your initial message within 48 hours of order placement; or your account experiences verifiable damage or issues directly caused by the boosting process during the RankGuard warranty period. Our goal is to ensure that every buyer gets exactly what they paid for.",
      },
      {
        number: 2,
        title: "How to Request a Refund",
        content:
          "To request a refund, go to your order page and click \"Raise a Dispute.\" Select the reason for your dispute from the dropdown menu and provide a detailed description of the issue. Include any supporting evidence — screenshots of the final rank, chat logs showing lack of communication, before-and-after comparisons, or any other relevant documentation. The more evidence you provide, the faster our team can review and resolve your case. You can raise a dispute at any time before confirming the order as received, or within the RankGuard warranty period after confirmation.",
      },
      {
        number: 3,
        title: "Our Review Process",
        content:
          "Once a dispute is filed, our dedicated support team begins the review process. Both the buyer and seller are notified and given the opportunity to present their side. Our team examines all available evidence — order chat history, screenshots, account data, and transaction records. We aim to complete initial reviews within 24-48 hours, though complex cases may take longer. Throughout the process, you'll receive status updates. Our team is trained to be objective and fair, and every decision is based on evidence and our platform policies.",
      },
      {
        number: 4,
        title: "Refund Timeline & Methods",
        content:
          "Approved refunds are processed promptly. Refunds to your Auraboost wallet are credited instantly — you can use the balance for another purchase or withdraw it. If you prefer a refund to your original payment method (credit card, debit card, etc.), processing typically takes 5-10 business days depending on your bank or payment provider. You'll receive an email confirmation when the refund is initiated and another when it's completed. Partial refunds may be issued in cases where the service was partially delivered.",
      },
      {
        number: 5,
        title: "Cases Not Eligible for Refund",
        content:
          "To maintain fairness for both buyers and sellers, certain situations are not eligible for refunds: orders that have been confirmed as received by the buyer (outside the RankGuard warranty period); buyer's remorse or change of mind after the service has been delivered as described; issues caused by the buyer's own actions (such as playing ranked games during a boost and causing losses); violations of Auraboost's terms of service by the buyer; and disputes filed more than 30 days after order completion. If you're unsure whether your case qualifies, contact our support team before filing a dispute.",
      },
      {
        number: 6,
        title: "Preventing Issues Before They Happen",
        content:
          "The best refund is one you never need. Here are tips to ensure a smooth experience: carefully read the service listing before ordering, communicate your expectations clearly with the booster before they start, check the booster's ratings and reviews, track your order progress regularly, and raise any concerns early through the order chat. Most issues can be resolved through direct communication with the booster before escalating to a formal dispute. Our support team is also available 24/7 if you need guidance at any point.",
      },
    ],
  },
  "become-partner": {
    id: "become-partner",
    title: "Become an Auraboost Partner — Grow Together",
    description:
      "Learn how to become an Auraboost partner. Explore partnership opportunities, requirements, application process, and the benefits of partnering with the leading game boosting platform.",
    steps: [
      {
        number: 1,
        title: "Why Partner with Auraboost?",
        content:
          "Auraboost is one of the fastest-growing game boosting platforms, and we're always looking for strategic partners to grow with us. Whether you're a content creator, gaming community leader, esports organization, or complementary service provider, partnering with Auraboost gives you access to our growing user base, competitive commission structures, co-marketing opportunities, and dedicated partner support. Our partners enjoy exclusive benefits that help them monetize their audience while providing genuine value to their community.",
      },
      {
        number: 2,
        title: "Partnership Types & Opportunities",
        content:
          "We offer several partnership tiers: Affiliate Partners earn commission on every referred sale through their unique tracking link — perfect for content creators and streamers. Community Partners receive special perks for their members, including exclusive discount codes and early access to new features. Business Partners integrate Auraboost services into their own platform or offer co-branded solutions. Each tier comes with its own benefits, commission structure, and support level. We'll work with you to find the right fit.",
      },
      {
        number: 3,
        title: "Requirements & Eligibility",
        content:
          "Partner requirements vary by tier. Affiliate Partners need an active online presence with an engaged gaming audience — this could be a YouTube channel, Twitch stream, Discord server, social media following, or gaming blog. Community Partners should manage a gaming community with at least 500 active members. Business Partners need an established business with a relevant audience or complementary service offering. All partners must agree to our partner code of conduct and maintain ethical promotion practices.",
      },
      {
        number: 4,
        title: "How to Apply",
        content:
          "Ready to get started? Submit your partner application through our Partner Program page. Include information about your platform, audience size and demographics, content niche, and why you'd be a great fit for Auraboost. Our partnerships team reviews every application and responds within 3-5 business days. If approved, you'll receive a welcome package with your unique partner links, promotional materials, brand guidelines, and access to our partner dashboard where you can track clicks, conversions, and earnings in real time.",
      },
      {
        number: 5,
        title: "Partner Benefits & Support",
        content:
          "Auraboost partners enjoy a range of exclusive benefits: competitive commission rates (up to 15% on referred sales), a dedicated partner manager for personalized support, custom discount codes for your audience, early access to new features and promotions, co-marketing opportunities including social media shoutouts and blog features, monthly performance reports, and priority support. Top-performing partners may also receive sponsored content opportunities and invitations to exclusive gaming events.",
      },
    ],
  },
};

export const navigationItems: NavigationItem[] = [
  {
    id: "help-center",
    title: "Help Center",
    href: "/docs",
    children: [
      {
        id: "i-am-buy",
        title: "I am Buying",
        href: "/docs/how-to-buy",
      },
      {
        id: "i-am-sel",
        title: "I am Selling",
        href: "/docs/how-to-sell",
      },
      {
        id: "aura-boost",
        title: "AuraBoost Account",
        href: "/docs/auraboost-account",
      },
      {
        id: "faq",
        title: "FAQ",
        href: "/docs/faq",
      },
    ],
  },
  {
    id: "become-partner",
    title: "Become a Partner",
    href: "/docs/become-partner",
    children: [],
  },
  {
    id: "tradeshield-buying",
    title: "RankGuard (Buying)",
    href: "/docs/tradeshield-buying",
    children: [],
  },
  {
    id: "tradeshield-selling",
    title: "RankGuard (Selling)",
    href: "/docs/tradeshield-selling",
    children: [],
  },
  {
    id: "deposited",
    title: "Deposits",
    href: "/docs/deposited",
    children: [],
  },
  {
    id: "withdrawal",
    title: "Withdrawals",
    href: "/docs/withdrawal",
    children: [],
  },
  {
    id: "account-seller-rules",
    title: "Account Seller Rules",
    href: "/docs/account-seller-rules",
    children: [],
  },
  {
    id: "seller-rules",
    title: "Seller Rules",
    href: "/docs/seller-rules",
    children: [],
  },
  {
    id: "changing-username",
    title: "Changing Username",
    href: "/docs/changing-username",
    children: [],
  },
  {
    id: "fees",
    title: "Fees",
    href: "/docs/fees",
    children: [],
  },
  {
    id: "refund-policy",
    title: "Refund Policy",
    href: "/docs/refund-policy",
    children: [],
  },
];
