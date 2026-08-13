import { Component, computed, input, resource } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

type TranscriptLine = {
  text: string;
  duration: number;
  offset: number;
};

@Component({
  selector: 'atomic-youtube-video',
  standalone: true,
  templateUrl: './atomic-youtube-video.component.html',
  styleUrl: './atomic-youtube-video.component.scss'
})
export class AtomicYoutubeVideoComponent {
  private static readonly YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

  readonly videoId = input.required<string>();

  constructor(private readonly sanitizer: DomSanitizer) {}

  readonly embedUrlRaw = computed(
    () =>
      `https://www.youtube.com/embed/${this.getSafeVideoId()}?cc_load_policy=1&hl=fr&enablejsapi=1`
  );

  readonly embedUrl = computed<SafeResourceUrl>(() =>
    // The URL is constrained to YouTube embed origin and a validated 11-char video id.
    this.sanitizer.bypassSecurityTrustResourceUrl(this.embedUrlRaw())
  );

  readonly watchUrl = computed(
    () => `https://www.youtube.com/watch?v=${this.videoId()}&cc_load_policy=1`
  );

  readonly transcriptAssetUrl = computed(() => `/assets/transcripts/${this.videoId()}.json`);

  readonly transcriptResource = resource<TranscriptLine[], string>({
    params: () => this.transcriptAssetUrl(),
    loader: async ({ params }) => {
      const response = await fetch(params);
      if (!response.ok) {
        throw new Error('Impossible de charger la transcription locale.');
      }

      const lines = (await response.json()) as TranscriptLine[];
      return lines.map((line) => ({
        text: line.text,
        duration: line.duration,
        offset: line.offset
      }));
    },
    defaultValue: []
  });

  private getSafeVideoId(): string {
    const id = this.videoId();
    if (!AtomicYoutubeVideoComponent.YOUTUBE_ID_PATTERN.test(id)) {
      throw new Error('Identifiant YouTube invalide.');
    }

    return id;
  }
}
