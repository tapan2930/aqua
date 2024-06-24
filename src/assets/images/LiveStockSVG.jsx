import * as React from "react"
import Svg, { Path, Ellipse, Circle } from "react-native-svg"
const LiveStockSVG = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <Path
      fill="#2763FF"
      d="M41.533 3.78C41.212 3.42 38.03 0 24 0 9.937 0 6.793 3.415 6.473 3.774A23.913 23.913 0 0 0 0 20.156c0 6.41 2.496 12.438 7.03 16.97A23.843 23.843 0 0 0 24 44.157c6.41 0 12.438-2.496 16.97-7.03A23.843 23.843 0 0 0 48 20.157c0-6.097-2.297-11.91-6.467-16.375Zm-28.469.071c2.997-.67 6.881-1.038 10.936-1.038s7.939.368 10.936 1.038c3.233.723 4.213 1.502 4.47 1.774-.257.272-1.237 1.051-4.47 1.774-2.997.67-6.881 1.038-10.936 1.038S16.061 8.07 13.064 7.4c-3.233-.723-4.213-1.502-4.47-1.774.257-.272 1.237-1.051 4.47-1.774ZM10.031 25.5a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0Zm24.375 4.929a2.346 2.346 0 0 0-2.343 2.344 2.346 2.346 0 0 0 2.343 2.343v2.813a5.154 5.154 0 0 1-4.244-2.233l-.06.06a9.779 9.779 0 0 1-6.96 2.883 9.78 9.78 0 0 1-6.96-2.883l-2.983-2.983 2.983-2.984a9.78 9.78 0 0 1 6.96-2.883 9.78 9.78 0 0 1 6.96 2.883l.06.06a5.154 5.154 0 0 1 4.244-2.233v2.813ZM15 20.438a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0Zm24.926-5.362c-1.29.443-2.509.861-5.004.861-2.496 0-3.715-.418-5.005-.86-1.384-.476-2.952-1.014-5.918-1.014-2.965 0-4.533.538-5.917 1.013-1.29.443-2.508.861-5.004.861-2.496 0-3.714-.418-5.004-.86-1.124-.386-2.369-.814-4.383-.961A21.095 21.095 0 0 1 6.798 7.8c.265.237 3.64 3.449 17.202 3.449 13.531 0 16.937-3.212 17.201-3.45a21.098 21.098 0 0 1 3.108 6.316c-2.014.147-3.26.575-4.383.96Z"
    />
    <Path
      fill="#A9C1FF"
      d="M17.611 34.396c-.815-.88-.815-2.312 0-3.191 3.093-3.34 8.125-3.34 11.218 0l.953 1.028a.808.808 0 0 1 .162.26.858.858 0 0 1-.162.874l-.953 1.029c-3.093 3.339-8.125 3.339-11.218 0Z"
      opacity={0.4}
    />
    <Ellipse cx={24} cy={5.5} fill="#A9C1FF" opacity={0.4} rx={13} ry={1.5} />
    <Circle cx={12.2} cy={25.2} r={1.2} fill="#A9C1FF" opacity={0.4} />
    <Circle cx={17.2} cy={20.2} r={1.2} fill="#A9C1FF" opacity={0.4} />
  </Svg>
)
export default LiveStockSVG
