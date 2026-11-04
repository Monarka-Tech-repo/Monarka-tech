/**
 * Window event fired by foreground players (e.g. the Studio 3D audio demo).
 * `detail.active` is true while they play; background music pauses meanwhile.
 */
export const AUDIO_FOCUS_EVENT = "monarka-audio-focus";
export type AudioFocusDetail = { active: boolean };
