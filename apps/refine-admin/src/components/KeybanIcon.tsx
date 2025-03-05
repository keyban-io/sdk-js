import { SvgIcon } from "@mui/material";

interface KeybanIconProps {
  width?: number;
  height?: number;
}

/**
 * KeybanIcon component renders the Keyban logo using SVG.
 * @returns A JSX element containing the Keyban logo.
 */
export function KeybanIcon({ width = 40, height = 40 }: KeybanIconProps) {
  return (
    <SvgIcon viewBox="0 0 236 236" sx={{ width, height }}>
      <rect fill="#a2d5f2" width="236" height="236" rx="10" ry="10" />
      <g
        transform="matrix(0.1, 0, 0, -0.1, 2.292, 220.5)"
        fill="#000000"
        stroke="none"
      >
        <path
          d="M320 1025 l0 -775 330 0 330 0 -92 85 -93 85 -152 0 -153 0 0 605 0 605 85 0 85 0 2 -311 3 -311 320 311 320 310 123 0 c67 1 122 -2 122 -6 0 -5 -198 -194 -440 -422 -242 -228 -439 -418 -438 -423 2 -4 131 -125 287 -268 l284 -260 380 0 c210 0 377 4 371 8 -15 14 -626 573 -664 608 l-35 33 -63 -57 -63 -57 195 -179 c108 -98 196 -180 196 -182 0 -2 -57 -4 -127 -4 l-128 1 -190 174 c-104 96 -190 181 -190 188 0 9 843 812 1059 1008 6 5 -154 9 -365 9 l-376 0 -204 -191 -204 -190 -3 190 -2 191 -255 0 -255 0 0 -775z"
          fill="#07689f"
        />
      </g>
    </SvgIcon>
  );
}
