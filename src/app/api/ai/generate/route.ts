import { NextRequest, NextResponse } from "next/server";

// Rate limiting variables
interface RateLimitInfo {
  count: number;
  resetTime: number;
}

// In-memory rate limiting (will reset on server restart)
// In production, consider using Redis or another persistent store
const RATE_LIMITS = new Map<string, RateLimitInfo>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // 5 requests per minute per IP

// Placeholder AI content generator
function generateFallbackContent(contentType: string, prompt: string) {
  // Basic implementation that will be replaced with actual AI functionality later
  return {
    message: "AI content generation will be implemented in the future",
    contentType,
    prompt,
    timestamp: new Date().toISOString()
  };
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               "unknown-ip";
    
    // Check rate limit
    const now = Date.now();
    const rateLimitInfo = RATE_LIMITS.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW };
    
    // Reset counter if window has passed
    if (now > rateLimitInfo.resetTime) {
      rateLimitInfo.count = 0;
      rateLimitInfo.resetTime = now + RATE_LIMIT_WINDOW;
    }
    
    // Increment counter
    rateLimitInfo.count++;
    RATE_LIMITS.set(ip, rateLimitInfo);
    
    // Check if rate limit exceeded
    if (rateLimitInfo.count > MAX_REQUESTS_PER_WINDOW) {
      const retryAfter = Math.ceil((rateLimitInfo.resetTime - now) / 1000);
      return NextResponse.json(
        { 
          error: "Rate limit exceeded",
          message: `Too many requests. Please try again in ${retryAfter} seconds.`,
          retryAfter
        }, 
        { status: 429, headers: { "Retry-After": retryAfter.toString() } }
      );
    }
    
    // Parse request body
    const body = await request.json();
    const { contentType, prompt } = body;
    
    if (!contentType || !prompt) {
      return NextResponse.json(
        { error: "Missing required fields", message: "Content type and prompt are required" },
        { status: 400 }
      );
    }
    
    // Generate content with placeholder function
    try {
      const content = generateFallbackContent(contentType, prompt);
      
      // Add rate limit headers to response
      const remainingRequests = MAX_REQUESTS_PER_WINDOW - rateLimitInfo.count;
      const resetAfter = Math.ceil((rateLimitInfo.resetTime - now) / 1000);
      
      return NextResponse.json(
        { success: true, content },
        { 
          status: 200, 
          headers: {
            "X-RateLimit-Limit": MAX_REQUESTS_PER_WINDOW.toString(),
            "X-RateLimit-Remaining": remainingRequests.toString(),
            "X-RateLimit-Reset": resetAfter.toString()
          }
        }
      );
    } catch (error: any) {
      console.error("Error generating content:", error);
      
      // Handle errors
      return NextResponse.json(
        { 
          error: "Content generation failed", 
          message: error.message || "Unknown error occurred"
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Unexpected error in API route:", error);
    return NextResponse.json(
      { error: "Server error", message: error.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
} 