// primitive types
interface Name {
  name: string;
}
interface Image {
  img: URL;
}
interface Width {
  width: number;
}
interface Height {
  height: number;
}
interface WidthAndHeight {
  WH: number;
}
interface TailWindStyle {
  tw: string;
}
export type AvatarPropsType = Name & Image & WidthAndHeight & TailWindStyle;
