export const generateChatResponse = input => {
  const hsCode = `${Math.floor(Math.random() * 9000) + 1000}.${
    Math.floor(Math.random() * 90) + 10
  }.${Math.floor(Math.random() * 90) + 10}`
  const confidence = Math.floor(Math.random() * 20) + 80
  const responseTime = (Math.random() * 2 + 0.5).toFixed(1)
  const classifications = [
    'Electrical machinery and equipment',
    'Textiles and textile articles',
    'Plastics and articles thereof',
    'Articles of iron or steel',
    'Optical, photographic, measuring instruments',
    'Vehicles, aircraft, vessels',
    'Furniture and bedding',
    'Live animals and animal products'
  ]
  const classification =
    classifications[Math.floor(Math.random() * classifications.length)]

  return `Based on your query about "${input}", the appropriate classification would be:\n\n**HS Code: ${hsCode}**\n\n**Classification:** ${classification}\n\n**Key factors:**\n• Material composition and construction\n• Primary function and intended use\n• Manufacturing process\n• Target market and application\n\n**Additional Notes:** This classification follows the General Rules for Interpretation (GRI) and considers the product's essential character.\n\n**Confidence Level:** ${confidence}%\n**Response Time:** ${responseTime}s`
}

export const formatTime = date =>
  date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  })
