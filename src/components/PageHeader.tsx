import christmasDivider from "@/assets/christmas-divider.png";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  dividerSrc?: string;
}

const PageHeader = ({ title, subtitle, dividerSrc }: PageHeaderProps) => {
  return (
    <div className="holiday-page-header pt-28 pb-4">
      <div className="container text-center">
        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">{title}</h1>
        {subtitle && <p className="font-body text-muted-foreground max-w-xl mx-auto">{subtitle}</p>}
        <div className="w-16 h-0.5 bg-primary mx-auto mt-6 mb-4" />
        <img
          src={dividerSrc || christmasDivider}
          alt=""
          className="holiday-header-art mx-auto max-w-md md:max-w-lg w-full h-auto"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default PageHeader;
