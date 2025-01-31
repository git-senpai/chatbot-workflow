export const registrationData = {
  initialFormData: {
    name: "",
    email: "",
    password: "",
    verificationCode: "",
  },
  sampleUser: {
    name: "John Smith",
    email: "john.smith@company.com",
    password: "SecurePass123!",
    verificationCode: "123456",
  },
};

export const organizationData = {
  initialFormData: {
    companyName: "",
    websiteUrl: "",
    description: "",
  },
  sampleMetaDescription:
    "Your trusted partner in business solutions. We provide innovative technology services to help businesses grow and succeed.",
  websitePages: [
    {
      url: "/",
      title: "Home Page",
      status: "scraped",
      chunks: [
        "Welcome to our company - your trusted partner in business solutions",
        "We provide innovative solutions for modern businesses",
        "Contact us today for a free consultation",
      ],
    },
    {
      url: "/about",
      title: "About Us",
      status: "scraped",
      chunks: ["Our story begins in 2010...", "Meet our experienced team"],
    },
    {
      url: "/services",
      title: "Services",
      status: "scraping",
      chunks: [],
    },
    {
      url: "/contact",
      title: "Contact",
      status: "pending",
      chunks: [],
    },
  ],
};

export const chatbotData = {
  integrationCode: `
<!-- Add this code to your website's <head> section -->
<script>
  window.chatbotConfig = {
    organizationId: "YOUR_ORG_ID",
    theme: "light",
    position: "bottom-right"
  };
</script>
<script src="https://cdn.yourchatbot.com/widget.js" async></script>
`.trim(),
  demoMessages: [
    {
      type: "bot",
      content: "Hello! How can I help you today?",
    },
    {
      type: "user",
      content: "What services do you offer?",
    },
    {
      type: "bot",
      content:
        "Based on our website, we offer:\n- Cloud Solutions\n- Digital Transformation\n- IT Consulting\n\nWould you like to know more about any specific service?",
    },
  ],
  demoContent: {
    title: "Demo Website",
    description:
      "This is a demo environment to test your chatbot. The chatbot widget should appear in the bottom-right corner of the screen.",
    sampleContent: [
      {
        title: "Sample Content",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        title: "More Content",
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
    ],
  },
};
