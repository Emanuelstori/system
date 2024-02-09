import { Howl } from "howler";

var sound = new Howl({
  src: ["/sounds/hoverSound.mp3"],
  volume: 0.05,
  html5: true,
});
export default function PlaySound() {
  sound.play();
}
