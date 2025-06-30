import classNames from 'classnames'
import { forwardRef } from 'react'
import type { ComponentPropsWithRef, ElementType } from 'react'

export interface THeadProps extends ComponentPropsWithRef<'thead'> {
    asElement?: ElementType
    isHeaderSticky?: boolean
}

const THead = forwardRef<HTMLElement, THeadProps>((props, ref) => {
    const { asElement: Component = 'thead', children, isHeaderSticky, className, ...rest } = props

    return (
        <Component
            {...rest}
            ref={ref}
            className={classNames(
                className,
                isHeaderSticky && 'sticky top-0 z-50 bg-white' // Add any other sticky styles you want here
            )}
        >
            {children}
        </Component>
    )
})

THead.displayName = 'THead'

export default THead
