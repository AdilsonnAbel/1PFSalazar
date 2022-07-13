export const regexEmail: RegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const regexFN: RegExp = /^[a-zA-Z/áéíóúñ]+( [a-zA-Z/áéíóúñ]+)*$/;

export const regexLN: RegExp = /^([a-zA-Z/áéíóúñ])+( [a-zA-Z/áéíóúñ]+$)/;

export const regexPassword: RegExp =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
