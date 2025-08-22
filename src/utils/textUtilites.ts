export function toggleClassInText(text: string, oldClass: string, newClass: string): string {
  const regex = new RegExp(oldClass, 'g');
  const newText = text.replace(regex, newClass);
  return newText;
}