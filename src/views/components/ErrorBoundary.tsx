import React, { ReactElement } from "react";

export class ErrorBoundary extends React.Component<
  { children: ReactElement },
  { hasError: boolean }
> {
  constructor(props: Readonly<{ children: ReactElement }>) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
       <div className="h-100 w-100 text-center fs-5">
        <h3>Đã xảy ra lỗi, vui lòng quay lại sau!</h3>
        <a href="/" >Trang chủ</a>
       </div>
      );
    }
    return this.props.children;
  }
}
