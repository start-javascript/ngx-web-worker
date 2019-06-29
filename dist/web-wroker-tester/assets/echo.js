onmessage = (e) => {
  const me = this;
  me.postMessage(e.data);
};
