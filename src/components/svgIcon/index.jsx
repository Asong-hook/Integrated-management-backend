export default function SvgIcon(props) {
    // eslint-disable-next-line react/prop-types
    const { name, prefix = "icon", color = "#333", style = { width: '20px', height: '20px' } } = props;
    const symbolId = `#${prefix}-${name}`
    return (
        <svg {...props} aria-hidden="true" style={style}>
            <use href={symbolId} fill={color} />
        </svg>
    )
}