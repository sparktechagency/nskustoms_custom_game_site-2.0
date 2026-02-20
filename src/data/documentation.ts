// app/data/documentation.ts

export interface DocumentationSection {
  id: string;
  title: string;
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
  external?: boolean;
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
  },
  "how-to-sell": {
    id: "how-to-sell",
    title: "How to sell on Auraboost?",
    steps: [
      {
        number: 1,
        title: "Create a Seller Account",
        content:
          "Sign up on Auraboost and complete the seller verification process. You will need to provide valid identification and agree to our seller terms.",
      },
      {
        number: 2,
        title: "List Your Service",
        content:
          "Create a listing for your boosting service. Include a clear title, detailed description, pricing, and any relevant images or rank screenshots.",
      },
      {
        number: 3,
        title: "Set Your Availability",
        content:
          "Configure your availability and the games you specialize in. This helps buyers find you when they need a boost.",
      },
      {
        number: 4,
        title: "Receive Orders",
        content:
          "When a buyer places an order, you will be notified instantly. Review the order details and accept the job to get started.",
      },
      {
        number: 5,
        title: "Complete the Boost",
        content:
          "Deliver the boosting service as described. Communicate with the buyer through the order chat to provide updates on progress.",
      },
      {
        number: 6,
        title: "Get Paid",
        content:
          "Once the buyer confirms the order is complete, your earnings will be credited to your Auraboost wallet. You can withdraw funds at any time.",
      },
    ],
  },
  "auraboost-account": {
    id: "auraboost-account",
    title: "AuraBoost Account",
    steps: [
      {
        number: 1,
        title: "Creating Your Account",
        content:
          "Visit Auraboost and click Sign Up. Enter your email, choose a username, and create a secure password. Verify your email to activate your account.",
      },
      {
        number: 2,
        title: "Profile Setup",
        content:
          "Complete your profile by adding a display name and avatar. A complete profile builds trust with other users on the platform.",
      },
      {
        number: 3,
        title: "Account Security",
        content:
          "Enable two-factor authentication for added security. Keep your login credentials private and never share your account with others.",
      },
      {
        number: 4,
        title: "Managing Your Account",
        content:
          "Access your account settings to update your email, password, notification preferences, and linked payment methods at any time.",
      },
    ],
  },
  faq: {
    id: "faq",
    title: "Frequently Asked Questions",
    steps: [
      {
        number: 1,
        title: "What is Auraboost?",
        content:
          "Auraboost is a trusted game boosting marketplace that connects buyers with verified, professional boosters. We support a variety of popular games and offer secure transactions with buyer protection.",
      },
      {
        number: 2,
        title: "Is boosting safe?",
        content:
          "Yes. Auraboost uses secure methods and our boosters follow strict guidelines to protect your account. All transactions are covered by our RankGuard warranty for added peace of mind.",
      },
      {
        number: 3,
        title: "How long does a boost take?",
        content:
          "Delivery times depend on the type of boost and the current queue. Most orders are started within a few hours and completed within 1-3 days. You can track progress in real time from your dashboard.",
      },
      {
        number: 4,
        title: "What payment methods do you accept?",
        content:
          "We accept Visa, Mastercard, American Express, Discover, Apple Pay, and Google Pay. All payments are processed securely through our payment gateway.",
      },
      {
        number: 5,
        title: "Can I get a refund?",
        content:
          "Yes. If a booster fails to deliver or the service does not match the description, you can raise a dispute and our support team will review the case. Eligible orders will receive a full refund.",
      },
    ],
  },
  "tradeshield-buying": {
    id: "tradeshield-buying",
    title: "RankGuard (Buying)",
    steps: [
      {
        number: 1,
        title: "What is RankGuard?",
        content:
          "RankGuard is Auraboost's buyer protection program. It ensures that every purchase you make is covered against fraud, misrepresentation, and non-delivery.",
      },
      {
        number: 2,
        title: "How It Protects You",
        content:
          "When you place an order, your payment is held securely until you confirm that the service has been delivered as described. If something goes wrong, our team steps in to resolve it.",
      },
      {
        number: 3,
        title: "Warranty Period",
        content:
          "After confirming your order, you have a 5-14 day warranty period depending on the game. During this time, if any issues arise with the delivered service, you can contact support for assistance.",
      },
      {
        number: 4,
        title: "Filing a Dispute",
        content:
          'If the service does not match the listing description, click "Raise a Dispute" on your order page. Provide screenshots and details so our support team can investigate and take action.',
      },
    ],
  },
  "tradeshield-selling": {
    id: "tradeshield-selling",
    title: "RankGuard (Selling)",
    steps: [
      {
        number: 1,
        title: "Seller Protection Overview",
        content:
          "RankGuard also protects sellers. Once a buyer confirms the order, your earnings are secured and released to your wallet. Sellers are protected from false disputes and chargebacks.",
      },
      {
        number: 2,
        title: "Delivering Your Service",
        content:
          "Always deliver the service exactly as described in your listing. Provide screenshots or proof of completion in the order chat to avoid disputes.",
      },
      {
        number: 3,
        title: "Handling Disputes",
        content:
          "If a buyer raises a dispute, our team will review the evidence from both sides. Respond promptly and provide any proof of delivery to support your case.",
      },
      {
        number: 4,
        title: "Maintaining Good Standing",
        content:
          "Sellers who consistently deliver quality service and maintain high ratings benefit from increased visibility and trust on the platform.",
      },
    ],
  },
  deposited: {
    id: "deposited",
    title: "Deposits",
    steps: [
      {
        number: 1,
        title: "Adding Funds",
        content:
          "You can deposit funds into your Auraboost wallet using any of our supported payment methods including Visa, Mastercard, Apple Pay, and Google Pay.",
      },
      {
        number: 2,
        title: "Processing Time",
        content:
          "Deposits are processed instantly in most cases. If your deposit does not appear within a few minutes, please contact our support team.",
      },
      {
        number: 3,
        title: "Using Your Balance",
        content:
          "Your wallet balance can be applied to any purchase on the platform. During checkout, the balance will be automatically deducted from the order total.",
      },
      {
        number: 4,
        title: "Deposit Limits",
        content:
          "There may be minimum and maximum deposit limits depending on your payment method and account verification level. Check your wallet page for details.",
      },
    ],
  },
  withdrawal: {
    id: "withdrawal",
    title: "Withdrawals",
    steps: [
      {
        number: 1,
        title: "Requesting a Withdrawal",
        content:
          "Navigate to your wallet and click Withdraw. Enter the amount you wish to withdraw and select your preferred payout method.",
      },
      {
        number: 2,
        title: "Payout Methods",
        content:
          "Auraboost supports withdrawals via bank transfer and other supported payout options. Make sure your payout details are up to date in your account settings.",
      },
      {
        number: 3,
        title: "Processing Time",
        content:
          "Withdrawals are typically processed within 1-3 business days. You will receive a notification once the funds have been sent.",
      },
      {
        number: 4,
        title: "Minimum Withdrawal",
        content:
          "A minimum withdrawal amount may apply. Check your wallet page for the current minimum threshold and any applicable fees.",
      },
    ],
  },
  "account-seller-rules": {
    id: "account-seller-rules",
    title: "Account Seller Rules",
    steps: [
      {
        number: 1,
        title: "Accurate Listings",
        content:
          "All account listings must be accurate and truthful. Include correct rank, level, skins, and any other relevant details. Misleading listings will result in penalties.",
      },
      {
        number: 2,
        title: "Timely Delivery",
        content:
          "Sellers must deliver account credentials within the agreed timeframe. Delays without communication may result in order cancellation and negative feedback.",
      },
      {
        number: 3,
        title: "No Account Recovery",
        content:
          "Attempting to recover a sold account is strictly prohibited and will result in a permanent ban from the platform and forfeiture of all earnings.",
      },
      {
        number: 4,
        title: "Communication",
        content:
          "Maintain professional and responsive communication with buyers through the order chat. Respond to messages within a reasonable timeframe.",
      },
    ],
  },
  "seller-rules": {
    id: "seller-rules",
    title: "Seller Rules",
    steps: [
      {
        number: 1,
        title: "Eligibility",
        content:
          "To sell on Auraboost, you must complete the seller verification process and agree to our terms of service. Sellers must be at least 18 years old.",
      },
      {
        number: 2,
        title: "Service Quality",
        content:
          "Deliver all services as described in your listings. Maintain a high completion rate and positive feedback score to remain in good standing.",
      },
      {
        number: 3,
        title: "Prohibited Activities",
        content:
          "Using cheats, hacks, exploits, or any unauthorized software during boosting is strictly prohibited. Violations will result in immediate suspension.",
      },
      {
        number: 4,
        title: "Pricing Guidelines",
        content:
          "Set fair and competitive prices for your services. Artificially inflating prices or engaging in price manipulation is not allowed.",
      },
      {
        number: 5,
        title: "Account Safety",
        content:
          "Treat buyer accounts with care. Do not share login details with third parties, do not make unauthorized purchases, and do not modify account settings without permission.",
      },
    ],
  },
  "changing-username": {
    id: "changing-username",
    title: "Changing Username",
    steps: [
      {
        number: 1,
        title: "Navigate to Account Settings",
        content:
          'Log into your Auraboost account and go to Account Settings from your dashboard sidebar.',
      },
      {
        number: 2,
        title: "Edit Your Username",
        content:
          'In the profile section, click on your current username and enter your new desired username. Usernames must be unique and follow our community guidelines.',
      },
      {
        number: 3,
        title: "Save Changes",
        content:
          'Click "Save" to confirm your new username. The change will take effect immediately across the platform.',
      },
      {
        number: 4,
        title: "Username Restrictions",
        content:
          "Usernames must be between 3-20 characters, contain only letters, numbers, and underscores. Offensive or misleading usernames are not permitted.",
      },
    ],
  },
  fees: {
    id: "fees",
    title: "Fees",
    steps: [
      {
        number: 1,
        title: "Buyer Fees",
        content:
          "Buyers may be subject to a small service fee on each transaction. The exact fee is displayed during checkout before you confirm your purchase.",
      },
      {
        number: 2,
        title: "Seller Fees",
        content:
          "Auraboost charges a commission on each completed sale. The commission rate varies based on your seller level and total sales volume.",
      },
      {
        number: 3,
        title: "Withdrawal Fees",
        content:
          "A small processing fee may apply when withdrawing funds from your wallet. The fee amount depends on your chosen payout method.",
      },
      {
        number: 4,
        title: "No Hidden Charges",
        content:
          "Auraboost is transparent about all fees. There are no hidden charges or surprise deductions. All applicable fees are clearly displayed before any transaction.",
      },
    ],
  },
  "refund-policy": {
    id: "refund-policy",
    title: "Refund Policy",
    steps: [
      {
        number: 1,
        title: "Eligibility for Refunds",
        content:
          "Refunds are available for orders that have not been delivered, orders that do not match the listing description, or orders where the seller fails to respond within the required timeframe.",
      },
      {
        number: 2,
        title: "How to Request a Refund",
        content:
          'Go to your order page and click "Raise a Dispute." Provide a clear description of the issue along with any supporting screenshots or evidence.',
      },
      {
        number: 3,
        title: "Review Process",
        content:
          "Our support team will review your dispute within 24-48 hours. Both buyer and seller will have the opportunity to present their case before a decision is made.",
      },
      {
        number: 4,
        title: "Refund Timeline",
        content:
          "Approved refunds are credited to your Auraboost wallet instantly. If you prefer a refund to your original payment method, it may take 5-10 business days to process.",
      },
      {
        number: 5,
        title: "Non-Refundable Cases",
        content:
          "Orders that have been confirmed as received by the buyer, or orders where the buyer has violated the terms of service, are not eligible for a refund.",
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
