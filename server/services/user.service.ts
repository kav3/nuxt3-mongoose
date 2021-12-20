import { CreateQuery, FilterQuery, QueryFindBaseOptions } from "mongoose";
import User, { UserDocument, UserInput } from "../models/user.model";

export const anyUser = async (query: FilterQuery<UserDocument>) => !!(await User.findOne(query));

export const countUser = async () => await User.count();

export const createUser = async (input: CreateQuery<UserInput>) => await User.create<UserInput>(input);

export const findUser = async (query: FilterQuery<UserDocument>,
    projection: any = {},
    options: QueryFindBaseOptions = { lean: true }) => await User.findOne(query, projection, options);
