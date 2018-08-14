import * as winston from 'winston';

export function helloWorld() {
  console.log("hello")

  winston.info("Yo lo")

  throw new Error("Test")
}