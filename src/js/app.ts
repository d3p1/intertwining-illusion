/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
class App {
  /**
   * @type {HTMLCanvasElement}
   */
  #canvas: HTMLCanvasElement

  /**
   * @type {CanvasRenderingContext2D}
   */
  #context: CanvasRenderingContext2D

  /**
   * Constructor
   */
  constructor() {
    this.#initCanvas()
    this.#draw()
  }

  /**
   * Draw
   *
   * @param   {number} circleCount
   * @param   {number} squareSize
   * @param   {number} radiusSpacing
   * @param   {number} squareSpacing
   * @returns {void}
   */
  #draw(
    circleCount: number = 8,
    squareSize: number = 20,
    radiusSpacing: number = 25,
    squareSpacing: number = 15,
  ): void {
    for (let i = 0; i < circleCount; i++) {
      const totalSquareSize = squareSize + squareSpacing
      const radius = (squareSize + radiusSpacing) * (i + 1)
      const circleLength = 2 * Math.PI * radius
      const squareCount = Math.floor(circleLength / totalSquareSize)
      const rotation = Math.PI * 0.1 * (-1) ** (i % 2)
      this.#drawCircleOfSquares(radius, squareCount, squareSize, rotation)
    }
  }

  /**
   * Draw circle of squares
   *
   * @param   {number} radius
   * @param   {number} squareCount
   * @param   {number} squareSize
   * @param   {number} rotation
   * @returns {void}
   */
  #drawCircleOfSquares(
    radius: number = 100,
    squareCount: number = 10,
    squareSize: number = 20,
    rotation: number = Math.PI * 0.1,
  ): void {
    this.#context.save()
    this.#context.translate(this.#canvas.width / 2, this.#canvas.height / 2)
    let index = 0
    for (
      let angle = 0;
      angle < 2 * Math.PI;
      angle += (2 * Math.PI) / squareCount
    ) {
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      let color = '#ffffff'
      if (index % 2) {
        color = '#000000'
      }
      this.#drawSquare(x, y, color, rotation, squareSize)
      index++
    }
    this.#context.restore()
  }

  /**
   * Draw square
   *
   * @param   {number} x
   * @param   {number} y
   * @param   {string} color
   * @param   {number} rotation
   * @param   {number} size
   * @param   {number} lineWidth
   * @returns {void}
   */
  #drawSquare(
    x: number,
    y: number,
    color: string = '#ffffff',
    rotation: number = Math.PI * 0.1,
    size: number = 20,
    lineWidth: number = 3,
  ): void {
    this.#context.save()
    this.#context.beginPath()
    this.#context.strokeStyle = color
    this.#context.lineWidth = lineWidth
    this.#context.translate(x, y)
    this.#context.rotate(rotation)
    this.#context.rect(0, 0, size, size)
    this.#context.stroke()
    this.#context.restore()
  }

  /**
   * Init canvas
   *
   * @returns {void}
   */
  #initCanvas(): void {
    this.#canvas = document.createElement('canvas')
    this.#context = this.#canvas.getContext('2d', {
      willReadFrequently: true,
    })

    this.#canvas.width = window.innerWidth
    this.#canvas.height = window.innerHeight
    document.body.appendChild(this.#canvas)
  }
}
new App()
