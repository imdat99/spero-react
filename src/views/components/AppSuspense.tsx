import React, { Suspense } from 'react'

import { ErrorBoundary } from './ErrorBoundary'
import styled from 'styled-components'
import BlurLayout from './BlurLayout'

interface AppSuspenseProps {
  children?: React.ReactElement
  comp?: React.LazyExoticComponent<() => JSX.Element>
}

export const LoadingScreen = () => {
    return (
        <BlurLayout loading={true}>
            <LoadingStyled />
        </BlurLayout>
    )
}

const AppSuspense: React.FC<AppSuspenseProps> = ({ children, comp: Comp }) => {
    return (
        <ErrorBoundary>
            <Suspense fallback={<LoadingScreen />}>{Comp ? <Comp /> : children}</Suspense>
        </ErrorBoundary>
    )
}

export default AppSuspense
const LoadingStyled = styled.div`
  width: 100vw;
  height: 100vw;
`