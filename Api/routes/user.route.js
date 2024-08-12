import express from 'express';
import { deleteAccount, getUserListings, test, updateUser } from '../controller/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteAccount);
router.get('/listings/:id', verifyToken, getUserListings);

export default router;