interface SVGProps {
  width?: string;
  height?: string;
  viewBox?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

export function ProjectXLogo({width, height, viewbox, children, }: SVGProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width ? width : "fit-content"} height={height ? height : "20"} viewBox="0 0 295 65" fill="none">
      <path d="M17.4475 9.954C22.5763 4.682 30.8916 4.682 36.0204 9.954C41.1492 15.226 41.1492 23.7736 36.0204 29.0456C30.8916 34.3176 22.5763 34.3176 17.4475 29.0456C12.3187 23.7736 12.3187 15.226 17.4475 9.954Z" fill="#516EEF" />
      <path d="M30.5805 23.4546C35.7093 18.1826 44.0247 18.1826 49.1534 23.4546C54.2822 28.7266 54.2822 37.2742 49.1534 42.5462C44.0247 47.8182 35.7093 47.8182 30.5805 42.5462C25.4517 37.2742 25.4517 28.7266 30.5805 23.4546Z" fill="#AD51EF" />
      <path d="M17.4475 36.9544C22.5763 31.6824 30.8916 31.6824 36.0204 36.9544C41.1492 42.2264 41.1492 50.774 36.0204 56.046C30.8916 61.318 22.5763 61.318 17.4475 56.046C12.3187 50.774 12.3187 42.2264 17.4475 36.9544Z" fill="#61E46F" />
      <path d="M3.84657 24.6112C8.97534 19.3392 17.2907 19.3392 22.4195 24.6112C27.5482 29.8832 27.5482 38.4308 22.4195 43.7028C17.2907 48.9748 8.97534 48.9748 3.84657 43.7028C-1.28219 38.4308 -1.28219 29.8832 3.84657 24.6112Z" fill="#51DCEF" />
      <path d="M79.9793 19.7818C80.8845 18.2327 82.1636 17.0013 83.8166 16.0876C85.4696 15.174 87.4177 14.7172 89.661 14.7172C92.2979 14.7172 94.679 15.4124 96.8042 16.8026C98.9688 18.1929 100.661 20.1791 101.881 22.761C103.141 25.343 103.77 28.3619 103.77 31.8178C103.77 35.2736 103.141 38.3124 101.881 40.9341C100.661 43.5161 98.9688 45.5022 96.8042 46.8925C94.679 48.2828 92.2979 48.9779 89.661 48.9779C87.4177 48.9779 85.4696 48.5211 83.8166 47.6075C82.203 46.6939 80.9239 45.4625 79.9793 43.9133V64.5293H68.4085V15.1343H79.9793V19.7818ZM92.0224 31.8178C92.0224 29.633 91.4321 27.9448 90.2514 26.7531C89.11 25.5217 87.6932 24.906 86.0009 24.906C84.3085 24.906 82.872 25.5217 81.6913 26.7531C80.55 27.9845 79.9793 29.6727 79.9793 31.8178C79.9793 34.0025 80.55 35.7106 81.6913 36.942C82.872 38.1734 84.3085 38.7891 86.0009 38.7891C87.6932 38.7891 89.11 38.1734 90.2514 36.942C91.4321 35.6709 92.0224 33.9628 92.0224 31.8178Z" fill="white" />
      <path d="M115.382 21.0331C116.68 19.1264 118.255 17.617 120.104 16.5047C121.954 15.3925 123.942 14.8364 126.067 14.8364V22.4001V27.2894H124.086H122.82C120.301 27.2894 118.432 27.7859 117.212 28.779C115.992 29.7721 115.382 31.5 115.382 33.9628V48.5608H103.811V15.1343H115.382V21.0331Z" fill="white" />
      <path d="M140.9 48.9779C137.594 48.9779 134.623 48.2828 131.986 46.8925C129.389 45.5022 127.342 43.5161 125.847 40.9341C124.351 38.3521 123.603 35.3134 123.603 31.8178C123.603 30.2142 123.764 28.7048 124.086 27.2894C124.458 25.6544 125.045 24.145 125.847 22.761C125.919 22.6394 125.992 22.5191 126.067 22.4001C127.577 19.9933 129.57 18.1274 132.045 16.8026C134.682 15.4124 137.653 14.7172 140.959 14.7172C144.265 14.7172 147.217 15.4124 149.815 16.8026C152.452 18.1929 154.518 20.1791 156.013 22.761C157.548 25.343 158.316 28.3619 158.316 31.8178C158.316 35.2736 157.548 38.3124 156.013 40.9341C154.518 43.5161 152.452 45.5022 149.815 46.8925C147.178 48.2828 144.206 48.9779 140.9 48.9779ZM140.9 38.8487C142.514 38.8487 143.852 38.2528 144.915 37.0611C146.017 35.8298 146.568 34.082 146.568 31.8178C146.568 29.5536 146.017 27.8257 144.915 26.634C143.852 25.4423 142.534 24.8465 140.959 24.8465C139.385 24.8465 138.067 25.4423 137.004 26.634C135.941 27.8257 135.41 29.5536 135.41 31.8178C135.41 34.1217 135.922 35.8695 136.945 37.0611C137.968 38.2528 139.287 38.8487 140.9 38.8487Z" fill="white" />
      <path d="M164.086 12.0359C162.039 12.0359 160.386 11.4798 159.127 10.3676C157.907 9.21563 157.297 7.78562 157.297 6.07755C157.297 4.32976 157.907 2.87989 159.127 1.72793C160.386 0.575978 162.039 0 164.086 0C166.093 0 167.707 0.575978 168.927 1.72793C170.186 2.87989 170.816 4.32976 170.816 6.07755C170.816 7.78562 170.186 9.21563 168.927 10.3676C167.707 11.4798 166.093 12.0359 164.086 12.0359ZM169.871 51.8379C169.871 60.2988 165.66 64.5293 157.238 64.5293H153.046V54.5788H155.526C156.51 54.5788 157.218 54.3802 157.651 53.983C158.084 53.5857 158.3 52.9303 158.3 52.0167V15.1343H169.871V51.8379Z" fill="white" />
      <path d="M203.323 31.4603C203.323 32.3739 203.264 33.2875 203.146 34.2011H181.244C181.362 36.0284 181.854 37.3988 182.72 38.3124C183.625 39.1863 184.766 39.6233 186.144 39.6233C188.072 39.6233 189.45 38.7494 190.276 37.0016H202.614C202.103 39.3055 201.099 41.371 199.604 43.1983C198.147 44.9858 196.298 46.3959 194.054 47.4287C191.811 48.4615 189.331 48.9779 186.616 48.9779C183.349 48.9779 180.437 48.2828 177.879 46.8925C175.36 45.5022 173.372 43.5161 171.916 40.9341C170.499 38.3521 169.791 35.3134 169.791 31.8178C169.791 28.3222 170.499 25.3033 171.916 22.761C173.333 20.1791 175.301 18.1929 177.82 16.8026C180.378 15.4124 183.31 14.7172 186.616 14.7172C189.882 14.7172 192.775 15.3925 195.294 16.7431C197.813 18.0936 199.781 20.04 201.197 22.5823C202.614 25.0848 203.323 28.0441 203.323 31.4603ZM191.516 28.5407C191.516 27.1106 191.043 25.9984 190.099 25.204C189.154 24.3698 187.974 23.9527 186.557 23.9527C185.14 23.9527 183.979 24.3499 183.074 25.1444C182.169 25.8991 181.578 27.0312 181.303 28.5407H191.516Z" fill="white" />
      <path d="M201.446 31.8178C201.446 28.3619 202.154 25.343 203.571 22.761C204.988 20.1791 206.956 18.1929 209.475 16.8026C212.033 15.4124 214.945 14.7172 218.212 14.7172C222.423 14.7172 225.965 15.889 228.838 18.2327C231.711 20.5366 233.561 23.774 234.387 27.9448H222.108C221.4 25.7601 220.022 24.6677 217.976 24.6677C216.52 24.6677 215.359 25.2834 214.493 26.5148C213.666 27.7065 213.253 29.4741 213.253 31.8178C213.253 34.1614 213.666 35.9489 214.493 37.1803C215.359 38.4117 216.52 39.0274 217.976 39.0274C220.062 39.0274 221.439 37.935 222.108 35.7503H234.387C233.561 39.8814 231.711 43.1188 228.838 45.4625C225.965 47.8061 222.423 48.9779 218.212 48.9779C214.945 48.9779 212.033 48.2828 209.475 46.8925C206.956 45.5022 204.988 43.5161 203.571 40.9341C202.154 38.3521 201.446 35.3134 201.446 31.8178Z" fill="white" />
      <path d="M254.012 38.6103V48.5608H248.994C240.532 48.5608 236.301 44.3304 236.301 35.8695V24.8465H232.228V15.1343H236.301V7.03089H247.931V15.1343H253.953V24.8465H247.931V36.0482C247.931 36.9618 248.128 37.6173 248.522 38.0145C248.955 38.4117 249.663 38.6103 250.647 38.6103H254.012Z" fill="white" />
      <path d="M280.631 48.5608L272.543 36.7036L265.636 48.5608H252.471L265.99 27.0511L251.999 6.55422H265.636L273.487 18.1135L280.217 6.55422H293.382L280.04 27.7065L294.268 48.5608H280.631Z" fill="white" />
    </svg>
  );
}
