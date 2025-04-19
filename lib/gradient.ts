export function calculateGradientPosition(
  mouseX: number,
  mouseY: number,
  windowWidth: number,
  windowHeight: number
): { x: number; y: number } {
  // If no dimensions, default to center
  if (!windowWidth || !windowHeight) {
    return { x: 50, y: 50 };
  }
  
  // Calculate position as percentage (0-100)
  // Map mouse position to create a more subtle effect
  // where the gradient moves within a smaller range (30%-70%)
  const x = 50 + ((mouseX / windowWidth - 0.5) * 40);
  const y = 50 + ((mouseY / windowHeight - 0.5) * 40);
  
  return { x, y };
}

export function createGradientStyle(
  position: { x: number; y: number },
  colors: string[]
): string {
  // Create a radial gradient centered at the calculated position
  return `
    radial-gradient(
      circle at ${position.x}% ${position.y}%, 
      ${colors[0]} 0%, 
      ${colors[1]} 30%, 
      ${colors[2]} 70%, 
      ${colors[3]} 100%
    )
  `;
}

export function getMobileGradient(colors: string[]): string {
  // Static gradient for mobile devices
  return `
    linear-gradient(
      135deg, 
      ${colors[0]} 0%, 
      ${colors[1]} 25%, 
      ${colors[2]} 75%, 
      ${colors[3]} 100%
    )
  `;
}