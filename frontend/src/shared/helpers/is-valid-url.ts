export function isValidURL(url : string) {
  const urlPattern = /^(https?:\/\/(?:www\.)?|www\.)[a-zA-Z0-9-]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+,.~#?&/=]*)$/;
  return urlPattern.test(url);
}

export function isValidImageURL(url : string){
  const urlPattern = /^(https?:\/\/(?:www\.)?|www\.)[a-zA-Z0-9-]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+,.~#?&/=]*)((\.png)|(\.jpg)|(\.jpeg)|(\.webp))$/;
  return urlPattern.test(url);
}