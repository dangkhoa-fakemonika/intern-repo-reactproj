import {client} from "@/shared/services/database/client";
import bcrypt from "bcrypt";
import {type User, userCredentialSchema, userSchema} from "@/shared/models/user";

const database = client.db("user");
const users = database.collection("information");

export const readCredential = async (email: string) => {
  const result = await users.findOne({email: email});
  if (result) return result;
  else return undefined;
}

export const createCredential = async (email: string, password: string) => {
  const schemaResult = userCredentialSchema.validate({email: email, password: password});
  if (schemaResult.error) {
    console.log(schemaResult);
    return undefined;
  }

  const encryptedPassword = bcrypt.hashSync(password, 10);
  return await users.insertOne({
    email: email,
    password: encryptedPassword
  });
}

export const updateCredential = async (email: string, password: string) => {
  const userCred = await users.findOne({user: email});
  if (userCred === null) {
    return undefined;
  }

  const schemaResult = userCredentialSchema.validate({username: userCred.username, password: password});
  if (schemaResult.error) {
    return undefined;
  }

  const match = bcrypt.compareSync(password, userCred.password);
  if (match) {
    return undefined;
  }


  const encryptedPassword = bcrypt.hashSync(password, 10);
  return await users.updateOne({user: userCred.username}, {password: encryptedPassword});
}

export const deleteUser = async (email: string) => {
  return await users.deleteOne({user: email});
}

export const readUserInformation = async (email: string) => {
  const result = await users.findOne({email: email});
  if (result) return result;
  else return undefined;
}

export const updateUserInformation = async (user: User) => {
  const schemaResult = userSchema.validate(user);

  if (schemaResult.error) {
    return undefined;
  }

  const result = await users.updateOne({email: user.email}, {user});
  if (result) return result;
  else return undefined;
}

