const stall = (time = 300) =>
  new Promise((resolve) => setTimeout(resolve, time));

export default stall;
