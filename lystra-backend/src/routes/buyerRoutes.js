import express from 'express'
import { verifyAccessToken } from '../middleware/isAuthenticated.js'
import isVerified from '../middleware/isVerified.js'
import addInterests from '../controllers/buyerControllers/addInterests.js'
import { getAdsByLocation } from '../controllers/buyerControllers/getAdsByLocation.js'
import { browseAds } from '../controllers/buyerControllers/browseAds.js'
import { getAllReview } from '../controllers/buyerControllers/getAllReview.js'
import { getTransactions } from '../controllers/buyerControllers/getTransaction.js'
import { getOrders } from '../controllers/buyerControllers/getOrders.js'

const buyerRoute = express.Router()

//all api's of buyer
buyerRoute.post('/interest', verifyAccessToken, isVerified, addInterests);
buyerRoute.get('/ads/location', verifyAccessToken, isVerified, getAdsByLocation);
buyerRoute.get('/getAdsByInterest', verifyAccessToken, isVerified, browseAds);
buyerRoute.get('/getAllReview/:buyerId', verifyAccessToken, isVerified, getAllReview);
buyerRoute.get('/transaction', verifyAccessToken, isVerified, getTransactions)

buyerRoute.get('/orders', verifyAccessToken, isVerified, getOrders);
export default buyerRoute