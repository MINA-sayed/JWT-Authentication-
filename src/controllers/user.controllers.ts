import jwt from 'jsonwebtoken'
import config from '../config'
import { NextFunction, Request, Response } from 'express'
import UserModel from '../models/user.model'

const userModel = new UserModel()

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.create(req.body)
    res.json({
      status: 'success',
      data: { ...user },
      message: 'User created successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const getMany = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.getMany()

    res.json({
      status: 'success',
      data: users,
      message: 'User retrieved successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.getOne(req.params.id as unknown as string)

    res.json({
      status: 'success',
      data: users,
      message: 'User retrieved successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.updateOne(req.body)

    res.json({
      status: 'success',
      data: users,
      message: 'User retrieved successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.deleteOne(req.params.id as unknown as string)

    res.json({
      status: 'success',
      data: users,
      message: 'User retrieved successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const authenticate1 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const user = await userModel.authenticate(email, password)
    const token = jwt.sign({ user }, config.tokenSecret as unknown as string)

    if (!user) {
      return res.status(401).json({
        status: 'error',
        data: null,
        message: 'the username and password is not match please try again',
      })
    }

    res.json({
      status: 'success',
      data: { ...user, token },
      message: 'User retrieved successfully',
    })
  } catch (error) {
    return next(error)
  }
}
