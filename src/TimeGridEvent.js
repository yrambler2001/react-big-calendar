import clsx from 'clsx'
import React from 'react'

/* eslint-disable react/prop-types */
function TimeGridEvent(props) {
  const {
    style,
    className,
    event,
    accessors,
    rtl,
    selected,
    label,
    continuesEarlier,
    continuesLater,
    getters,
    onClick,
    onDoubleClick,
    components: {
      event: Event,
      eventWrapper: EventWrapper,
      eventWrapperChild: EventWrapperChild,
    },
  } = props
  let title = accessors.title(event)
  let tooltip = accessors.tooltip(event)
  let end = accessors.end(event)
  let start = accessors.start(event)

  let userProps = getters.eventProp(event, start, end, selected)

  let { height, top, width, xOffset } = style
  const inner = [
    <div key="1" className="rbc-event-label">
      {label}
    </div>,
    <div key="2" className="rbc-event-content">
      {Event ? <Event event={event} title={title} /> : title}
    </div>,
  ]

  return (
    <EventWrapper type="time" {...props}>
      <div
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        style={{
          ...userProps.style,
          top: `${top}%`,
          height: `${height}%`,
          [rtl ? 'right' : 'left']: `${Math.max(0, xOffset)}%`,
          width: `${width}%`,
        }}
        title={
          tooltip
            ? (typeof label === 'string' ? label + ': ' : '') + tooltip
            : undefined
        }
        className={clsx('rbc-event', className, userProps.className, {
          'rbc-selected': selected,
          'rbc-event-continues-earlier': continuesEarlier,
          'rbc-event-continues-later': continuesLater,
        })}
      >
        <EventWrapperChild {...props}>{inner}</EventWrapperChild>
      </div>
    </EventWrapper>
  )
}

export default TimeGridEvent
