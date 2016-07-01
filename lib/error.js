export default function (message) {
  if (this instanceof Error) {
    this.message = message;
    return;
  }

  return new Error(message);
}
