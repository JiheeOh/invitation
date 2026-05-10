declare global {
  interface Window {
    Kakao?: {
      init: (appKey: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: {
          objectType: string;
          content: {
            title: string;
            description: string;
            imageUrl?: string;
            link: {
              webUrl: string;
              mobileWebUrl: string;
            };
          };
          buttons?: Array<{
            title: string;
            link: {
              webUrl: string;
              mobileWebUrl: string;
            };
          }>;
        }) => void;
      };
    };
  }
}

export {};
