export function toggleClassInText(text: string, oldClass: string, newClass: string): string {
  const regex = new RegExp(oldClass, 'g');
  const newText = text.replace(regex, newClass);
  return newText;
}

export const getFirstLetterTitle = (title: string) => title.charAt(0).toUpperCase(); 
export const getRestOfTitle = (title: string) => title.slice(1); 