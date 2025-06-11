/* eslint-disable @typescript-eslint/no-require-imports */
import { test, expect, describe, beforeEach, jest, mock } from "bun:test";
import { z } from "zod";

// Mock external dependencies
const mockPayload = {
  find: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  sendEmail: jest.fn(),
};

const mockCurrentUser = jest.fn();
const mockNextCookies = jest.fn();
const mockRevalidatePath = jest.fn();

// Mock modules
mock.module("payload", () => ({
  getPayload: jest.fn().mockResolvedValue(mockPayload),
}));

mock.module("@clerk/nextjs/server", () => ({
  currentUser: mockCurrentUser,
}));

mock.module("next/headers", () => ({
  cookies: mockNextCookies,
}));

mock.module("next/cache", () => ({
  revalidatePath: mockRevalidatePath,
  unstable_cache: jest.fn((fn) => fn),
}));

mock.module("react", () => ({
  cache: jest.fn((fn) => fn),
}));

// Lib folder tests
describe("utils.ts", () => {
  const { cn, wait, getRandomNumber, formatImage } = require("../lib/utils");

  describe("cn function", () => {
    test("should merge class names correctly", () => {
      expect(cn("class1", "class2")).toBe("class1 class2");
      expect(cn("class1", undefined, "class2")).toBe("class1 class2");
    });

    test("should handle empty strings and null values", () => {
      expect(cn("", null, "class1")).toBe("class1");
      expect(cn()).toBe("");
      expect(cn(false && "hidden", "visible")).toBe("visible");
    });

    test("should handle conditional classes", () => {
      expect(cn("base", true && "active", false && "inactive")).toBe("base active");
      expect(cn("base", "override", "base")).toBe("override base");
    });

    test("should handle complex tailwind merge scenarios", () => {
      expect(cn("p-4", "p-2")).toBe("p-2");
      expect(cn("text-red-500", "text-blue-600")).toBe("text-blue-600");
    });
  });

  describe("wait function", () => {
    test("should resolve after specified milliseconds", async () => {
      const start = Date.now();
      await wait(100);
      const end = Date.now();
      expect(end - start).toBeGreaterThanOrEqual(90);
    });

    test("should handle zero and negative values", async () => {
      const start = Date.now();
      await wait(0);
      const end = Date.now();
      expect(end - start).toBeLessThan(50);
    });

    test("should handle large values", async () => {
      const start = Date.now();
      await wait(1000);
      const end = Date.now();
      expect(end - start).toBeGreaterThanOrEqual(950);
    }, 2000);

    test("should return a Promise", () => {
      const result = wait(10);
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe("getRandomNumber function", () => {
    test("should return number within range", () => {
      for (let i = 0; i < 100; i++) {
        const result = getRandomNumber(1, 10);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(10);
        expect(Number.isInteger(result)).toBe(true);
      }
    });

    test("should return float when isFloat is true", () => {
      const result = getRandomNumber(1, 2, true);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(2);
      expect(Number.isInteger(result)).toBe(false);
    });

    test("should handle edge cases", () => {
      const result = getRandomNumber(5, 5);
      expect(result).toBe(5);
    });

    test("should handle negative ranges", () => {
      for (let i = 0; i < 10; i++) {
        const result = getRandomNumber(-10, -1);
        expect(result).toBeGreaterThanOrEqual(-10);
        expect(result).toBeLessThanOrEqual(-1);
      }
    });

    test("should handle mixed positive/negative ranges", () => {
      for (let i = 0; i < 10; i++) {
        const result = getRandomNumber(-5, 5);
        expect(result).toBeGreaterThanOrEqual(-5);
        expect(result).toBeLessThanOrEqual(5);
      }
    });
  });

  describe("formatImage function", () => {
    test("should return default image for number input", () => {
      expect(formatImage(123)).toBe("./images/404.png");
      expect(formatImage(0)).toBe("./images/404.png");
    });

    test("should return Media object URL", () => {
      const mediaObject = { url: "/test-image.jpg", alt: "Test" };
      expect(formatImage(mediaObject)).toBe("/test-image.jpg");
    });

    test("should handle Media object with complex URL", () => {
      const mediaObject = { url: "https://example.com/images/test.png" };
      expect(formatImage(mediaObject)).toBe("https://example.com/images/test.png");
    });

    test("should handle undefined URL in Media object", () => {
      const mediaObject = { url: undefined };
      expect(formatImage(mediaObject)).toBeUndefined();
    });
  });
});

describe("metadata.ts", () => {
  const { generateMetadata } = require("../lib/metadata");

  describe("generateMetadata function", () => {
    test("should generate basic metadata", () => {
      const result = generateMetadata("https://example.com", "Test Page");
      
      expect(result.title).toBe("Test Page");
      expect(result.description).toBe("Providing the best project experience");
      expect(result.openGraph?.title).toBe("Test Page");
      expect(result.openGraph?.url).toBe("https://example.com");
      expect(result.twitter?.card).toBe("summary_large_image");
    });

    test("should use custom description", () => {
      const result = generateMetadata(
        "https://example.com", 
        "Test Page", 
        { description: "Custom description" }
      );
      
      expect(result.description).toBe("Custom description");
      expect(result.openGraph?.description).toBe("Custom description");
      expect(result.twitter?.description).toBe("Custom description");
    });

    test("should use custom images", () => {
      const customImages = [
        {
          url: "https://example.com/custom.jpg",
          width: 800,
          height: 600,
          alt: "Custom image"
        }
      ];
      
      const result = generateMetadata(
        "https://example.com", 
        "Test Page", 
        { images: customImages }
      );
      
      expect(result.openGraph?.images).toEqual(customImages);
    });

    test("should handle empty overrides", () => {
      const result = generateMetadata("https://example.com", "Test Page", {});
      
      expect(result.title).toBe("Test Page");
      expect(result.description).toBe("Providing the best project experience");
    });

    test("should set correct icons", () => {
      const result = generateMetadata("https://example.com", "Test Page");
      
      expect(result.icons).toEqual({
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png",
      });
    });

    test("should set correct robots configuration", () => {
      const result = generateMetadata("https://example.com", "Test Page");
      
      expect(result.robots).toEqual({
        index: true,
        follow: true,
        nocache: false,
      });
    });

    test("should handle Twitter creator", () => {
      const result = generateMetadata("https://example.com", "Test Page");
      
      expect(result.twitter?.creator).toBe("@sudharshans2009");
    });
  });
});

describe("cache.ts", () => {
  const { cache } = require("../lib/cache");

  test("should create cached function", () => {
    const mockCallback = jest.fn().mockResolvedValue("test result");
    const cachedFn = cache(mockCallback, ["test-key"], { revalidate: 3600 });
    
    expect(typeof cachedFn).toBe("function");
  });

  test("should handle empty options", () => {
    const mockCallback = jest.fn().mockResolvedValue("test result");
    const cachedFn = cache(mockCallback, ["test-key"]);
    
    expect(typeof cachedFn).toBe("function");
  });

  test("should pass through callback parameters", async () => {
    const mockCallback = jest.fn().mockResolvedValue("test result");
    const cachedFn = cache(mockCallback, ["test-key"]);
    
    await cachedFn("param1", "param2");
    expect(mockCallback).toHaveBeenCalledWith("param1", "param2");
  });
});

describe("Form Schema Validation", () => {
  const { formSchema } = require("../forms/submitEmail");

  describe("formSchema", () => {
    test("should validate correct form data", () => {
      const validData = {
        name: "John Doe",
        email: "john@example.com",
        message_content: "This is a test message that is long enough",
        ip: "192.168.1.1"
      };
      
      const result = formSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    test("should reject invalid email", () => {
      const invalidData = {
        name: "John Doe",
        email: "invalid-email",
        message_content: "This is a test message that is long enough"
      };
      
      const result = formSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].path).toEqual(["email"]);
    });

    test("should reject short name", () => {
      const invalidData = {
        name: "Jo",
        email: "john@example.com",
        message_content: "This is a test message that is long enough"
      };
      
      const result = formSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].path).toEqual(["name"]);
    });

    test("should reject long name", () => {
      const invalidData = {
        name: "a".repeat(51),
        email: "john@example.com",
        message_content: "This is a test message that is long enough"
      };
      
      const result = formSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].path).toEqual(["name"]);
    });

    test("should reject short message", () => {
      const invalidData = {
        name: "John Doe",
        email: "john@example.com",
        message_content: "Short"
      };
      
      const result = formSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].path).toEqual(["message_content"]);
    });

    test("should reject long message", () => {
      const invalidData = {
        name: "John Doe",
        email: "john@example.com",
        message_content: "a".repeat(501)
      };
      
      const result = formSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].path).toEqual(["message_content"]);
    });

    test("should allow optional IP", () => {
      const validData = {
        name: "John Doe",
        email: "john@example.com",
        message_content: "This is a test message that is long enough"
      };
      
      const result = formSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    test("should handle missing required fields", () => {
      const invalidData = {};
      
      const result = formSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues.length).toBeGreaterThan(0);
    });
  });
});

describe("Server Actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mocks
    mockCurrentUser.mockResolvedValue({
      primaryEmailAddress: { emailAddress: "test@example.com" }
    });
    
    mockNextCookies.mockReturnValue({
      set: jest.fn()
    });
    
    mockPayload.find.mockResolvedValue({ docs: [] });
    mockPayload.create.mockResolvedValue({ id: "123" });
    mockPayload.update.mockResolvedValue({ id: "123" });
    mockPayload.sendEmail.mockResolvedValue({ messageId: "email-123" });
  });

  describe("submitEmail server action", () => {
    const { submitEmail } = require("../app/(frontend)/contact/_action/submitEmail");

    test("should successfully submit valid email", async () => {
      const formData = {
        name: "John Doe",
        email: "test@example.com",
        message_content: "This is a test message that is long enough",
        ip: "192.168.1.1"
      };

      const result = await submitEmail(formData);
      
      expect(result.success).toBe(true);
      expect(mockPayload.create).toHaveBeenCalledWith({
        collection: "messages",
        data: {
          email: "test@example.com",
          name: "John Doe",
          message: "This is a test message that is long enough",
          ip: "192.168.1.1",
          type: "initial"
        }
      });
    });

    test("should reject if user not logged in", async () => {
      mockCurrentUser.mockResolvedValue(null);
      
      const formData = {
        name: "John Doe",
        email: "test@example.com",
        message_content: "This is a test message that is long enough",
        ip: "192.168.1.1"
      };

      const result = await submitEmail(formData);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe("You must be logged in to send a message.");
    });

    test("should reject if email doesn't match logged-in user", async () => {
      mockCurrentUser.mockResolvedValue({
        primaryEmailAddress: { emailAddress: "different@example.com" }
      });
      
      const formData = {
        name: "John Doe",
        email: "test@example.com",
        message_content: "This is a test message that is long enough",
        ip: "192.168.1.1"
      };

      const result = await submitEmail(formData);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe("Email does not match the logged-in user.");
    });

    test("should enforce rate limiting", async () => {
      mockPayload.find.mockResolvedValue({
        docs: [{
          id: "123",
          timestamp: Date.now() - (30 * 60 * 1000) // 30 minutes ago
        }]
      });
      
      const formData = {
        name: "John Doe",
        email: "test@example.com",
        message_content: "This is a test message that is long enough",
        ip: "192.168.1.1"
      };

      const result = await submitEmail(formData);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe("You can only send a message once every hour.");
    });

    test("should allow submission after rate limit expires", async () => {
      mockPayload.find.mockResolvedValue({
        docs: [{
          id: "123",
          timestamp: Date.now() - (2 * 60 * 60 * 1000) // 2 hours ago
        }]
      });
      
      const formData = {
        name: "John Doe",
        email: "test@example.com",
        message_content: "This is a test message that is long enough",
        ip: "192.168.1.1"
      };

      const result = await submitEmail(formData);
      
      expect(result.success).toBe(true);
      expect(mockPayload.update).toHaveBeenCalled();
    });

    test("should reject invalid form data", async () => {
      const formData = {
        name: "Jo", // Too short
        email: "invalid-email",
        message_content: "Short",
        ip: "192.168.1.1"
      };

      const result = await submitEmail(formData);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe("Invalid form data.");
    });

    test("should handle missing required fields", async () => {
      const formData = {
        name: "",
        email: "test@example.com",
        message_content: "This is a test message",
        ip: "192.168.1.1"
      };

      const result = await submitEmail(formData);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe("All fields are required.");
    });

    test("should handle missing IP address", async () => {
      const formData = {
        name: "John Doe",
        email: "test@example.com",
        message_content: "This is a test message that is long enough",
        ip: ""
      };

      const result = await submitEmail(formData);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe("IP address is invalid.");
    });

    test("should handle database errors", async () => {
      mockPayload.create.mockRejectedValue(new Error("Database connection failed"));
      
      const formData = {
        name: "John Doe",
        email: "test@example.com",
        message_content: "This is a test message that is long enough",
        ip: "192.168.1.1"
      };

      const result = await submitEmail(formData);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe("Database connection failed");
    });

    test("should handle email sending errors", async () => {
      mockPayload.sendEmail.mockRejectedValue(new Error("Email service unavailable"));
      
      const formData = {
        name: "John Doe",
        email: "test@example.com",
        message_content: "This is a test message that is long enough",
        ip: "192.168.1.1"
      };

      const result = await submitEmail(formData);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe("Email service unavailable");
    });

    test("should set cookie and revalidate path on success", async () => {
      const mockSetCookie = jest.fn();
      mockNextCookies.mockReturnValue({
        set: mockSetCookie
      });
      
      const formData = {
        name: "John Doe",
        email: "test@example.com",
        message_content: "This is a test message that is long enough",
        ip: "192.168.1.1"
      };

      await submitEmail(formData);
      
      expect(mockSetCookie).toHaveBeenCalledWith("ip", "192.168.1.1", { maxAge: 604800 });
      expect(mockRevalidatePath).toHaveBeenCalledWith("/", "layout");
    });

    test("should handle unknown errors gracefully", async () => {
      mockPayload.create.mockRejectedValue("Unknown error type");
      
      const formData = {
        name: "John Doe",
        email: "test@example.com",
        message_content: "This is a test message that is long enough",
        ip: "192.168.1.1"
      };

      const result = await submitEmail(formData);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe("Failed to send email. Please try again later.");
    });
  });
});

describe("Type Safety Tests", () => {
  test("FormSchema type should match zod schema", () => {
    const { formSchema } = require("../forms/submitEmail");
    
    const validData = {
      name: "John Doe",
      email: "test@example.com",
      message_content: "This is a test message",
      ip: "192.168.1.1"
    };
    
    const result = formSchema.safeParse(validData);
    expect(result.success).toBe(true);
    
    if (result.success) {
      expect(typeof result.data.name).toBe("string");
      expect(typeof result.data.email).toBe("string");
      expect(typeof result.data.message_content).toBe("string");
      expect(typeof result.data.ip).toBe("string");
    }
  });
});

describe("Integration Tests", () => {
  test("should handle complete form submission flow", async () => {
    const { submitEmail } = require("../app/(frontend)/contact/_action/submitEmail");
    
    // Setup successful scenario
    mockCurrentUser.mockResolvedValue({
      primaryEmailAddress: { emailAddress: "test@example.com" }
    });
    
    mockPayload.find.mockResolvedValue({ docs: [] });
    mockPayload.create.mockResolvedValue({ id: "message-123" });
    mockPayload.sendEmail.mockResolvedValue({ messageId: "email-123" });
    
    const formData = {
      name: "John Doe",
      email: "test@example.com",
      message_content: "This is a comprehensive test message that meets all requirements",
      ip: "192.168.1.1"
    };

    const result = await submitEmail(formData);
    
    expect(result.success).toBe(true);
    expect(result.mail).toEqual({ messageId: "email-123" });
    expect(result.error).toBeNull();
    
    // Verify all expected calls
    expect(mockPayload.find).toHaveBeenCalled();
    expect(mockPayload.create).toHaveBeenCalledTimes(2); // messages + rate_limits
    expect(mockPayload.sendEmail).toHaveBeenCalled();
    expect(mockRevalidatePath).toHaveBeenCalled();
  });
});