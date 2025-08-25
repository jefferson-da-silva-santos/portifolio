export function toggleClassInText(text: string, oldClass: string, newClass: string): string {
  const regex = new RegExp(oldClass, 'g');
  const newText = text.replace(regex, newClass);
  return newText;
}

export const getFirstLetterTitle = (title: string) => title.charAt(0).toUpperCase(); // get first letter of title
export const getRestOfTitle = (title: string) => title.slice(1); // get rest of title