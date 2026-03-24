import floralDivider from "@/assets/floral-divider.png";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <div className="pt-24 pb-4 bg-background">
      <div className="container text-center">
        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">{title}</h1>
        {subtitle && <p className="font-body text-muted-foreground max-w-lg mx-auto">{subtitle}</p>}
        <div className="w-16 h-0.5 bg-primary mx-auto mt-6 mb-4" />
        <img
          src={floralDivider}
          alt=""
          className="mx-auto max-w-md md:max-w-lg w-full h-auto"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default PageHeader;
