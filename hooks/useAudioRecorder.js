'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

async function fixWebmDuration(blob, durationMs) {
  if (!blob.type.includes('webm')) return blob;
  const buf = await blob.arrayBuffer();
  const view = new DataView(buf);
  for (let i = 0; i < buf.byteLength - 10; i++) {
    if (view.getUint8(i) === 0x44 &&
        view.getUint8(i + 1) === 0x89 &&
        view.getUint8(i + 2) === 0x88) {
      const val = view.getFloat64(i + 3);
      if (!isFinite(val) || val <= 0) {
        view.setFloat64(i + 3, durationMs);
      }
      break;
    }
  }
  return new Blob([buf], { type: blob.type });
}

export function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recordingStartTime, setRecordingStartTime] = useState(null);

  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);

  // Clean up mic stream and revoke any previous blob URL.
  const cleanup = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  useEffect(() => cleanup, [cleanup]);

  const startRecording = useCallback(async () => {
    // Revoke previous recording if any
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }

    chunksRef.current = [];

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;

    // Prefer webm (Chrome/Edge/Brave), fall back to whatever the browser supports.
    const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
      ? 'audio/webm;codecs=opus'
      : '';

    const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    const startedAt = Date.now();

    recorder.onstop = async () => {
      let blob = new Blob(chunksRef.current, {
        type: recorder.mimeType || 'audio/webm',
      });
      blob = await fixWebmDuration(blob, Date.now() - startedAt);
      setAudioUrl(URL.createObjectURL(blob));
      cleanup();
    };

    recorderRef.current = recorder;
    setRecordingStartTime(startedAt);
    recorder.start();
    setIsRecording(true);
  }, [audioUrl, cleanup]);

  const stopRecording = useCallback(() => {
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      recorderRef.current.stop();
    }
    setIsRecording(false);
  }, []);

  return { isRecording, audioUrl, recordingStartTime, startRecording, stopRecording };
}
