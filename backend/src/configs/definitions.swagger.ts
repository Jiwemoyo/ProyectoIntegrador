/**
 * @swagger
 * components:
 *   schemas:
 *     LatLng:
 *       type: object
 *       properties:
 *         lat:
 *           type: string
 *         lng:
 *           type: string
 *     
 *     Food:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         favorite:
 *           type: boolean
 *         stars:
 *           type: number
 *         imageUrl:
 *           type: string
 *         origins:
 *           type: array
 *           items:
 *             type: string
 *         cookTime:
 *           type: string
 * 
 *     OrderItem:
 *       type: object
 *       properties:
 *         food:
 *           $ref: '#/components/schemas/Food'
 *         price:
 *           type: number
 *         quantity:
 *           type: number
 * 
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         totalPrice:
 *           type: number
 *         name:
 *           type: string
 *         address:
 *           type: string
 *         addressLatLng:
 *           $ref: '#/components/schemas/LatLng'
 *         paymentId:
 *           type: string
 *         status:
 *           type: string
 *         user:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
