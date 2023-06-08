import styles from './LoadingSpinner.module.scss';

export type LoadingSpinnerProps = {
  size?: 'lg' | 'md' | 'sm';
  color?:
    | 'primary'
    | 'primary-2'
    | 'secondary'
    | 'secondary-2'
    | 'foreground'
    | 'danger';
};

export const LoadingSpinner = ({
  size = 'md',
  color = 'primary'
}: LoadingSpinnerProps) => {
  return (
    <div
      className={`${styles.loading_spinner} ${
        styles[`loading_spinner_${size}`]
      }`}
      style={{
        borderLeftColor: `rgb(var(--color-${color}, #000) / 0.5)`,
        borderRightColor: `rgb(var(--color-${color}, #000) / 0.5)`,
        borderBottomColor: `rgb(var(--color-${color}, #000) / 0.5)`,
        borderTopColor: `rgb(var(--color-${color}, #000))`
      }}
    ></div>
  );
};
