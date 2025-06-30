import { Request, Response } from 'express';
import UserModel from '../models/User';
import { userDTO, status, userType } from '../interfaces/user.model';

export async function signIn(req: Request, res: Response) {
    try {
        const body = req.body;

        const user = await UserModel.findOne({
            username: body.username
        });

        if (!user || user?.password !== body.password) {
            res.status(401).json({
                message: 'Invalid username or password'
            });
            return
        }

        user.status = status.active;

        const userSaved = await user.save()

        res.status(200).json(userSaved);

    } catch (error) {
        res.status(500).json({ message: 'Error', error })
    }
}

export async function signUp(req: Request, res: Response) {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            res.status(400).json({
                message: 'Username and password are required'
            })
            return
        }

        const usernameExists = await UserModel.findOne({ username: username })

        if (usernameExists) {
            res.status(409).json({ message: 'The username is already taken' });
            return
        }

        const newUser = await new UserModel({
            user_type: userType.authenticated,
            username: username,
            password: password,
            status: status.active
        });

        const savedUser = await newUser.save()

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error', error })
    }
}

export async function guest(req: Request, res: Response) {
    try {
        const newUser = new UserModel({
            status: status.active
        });

        const savedUser = await newUser.save()

        res.status(201).json(savedUser);

    } catch (error) {
        res.status(500).json({ message: 'Error', error })
    }
}

export async function logout(req: Request, res: Response) {
    try {
        const body = req.body

        const user = await UserModel.findOne({
            '_id': body.id
        })

        user.status = status.inactive
        await user.save()

        res.status(200);
    } catch (error) {
        res.status(500).send({ message: 'Error', error })
    }
}