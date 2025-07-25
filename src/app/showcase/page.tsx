'use client';

import React from 'react';
import Button from '@/components/atoms/Button/Button';
import styles from './page.module.scss';

const ShowcasePage = () => {
  return (
    <div className={styles.showcase}>
      <header className={styles.showcase__header}>
        <div className={styles.showcase__container}>
          <h1 className={styles.showcase__title}>PopShelf Component Showcase</h1>
          <p className={styles.showcase__description}>
            A comprehensive collection of atomic design components following the PopShelf design system
          </p>
        </div>
      </header>

      <nav className={styles.showcase__nav}>
        <div className={styles.showcase__container}>
          <ul className={styles.showcase__navList}>
            <li className={styles.showcase__navItem}>
              <a href="#atoms" className={styles.showcase__navLink}>Atoms</a>
            </li>
            <li className={styles.showcase__navItem}>
              <a href="#molecules" className={styles.showcase__navLink}>Molecules</a>
            </li>
            <li className={styles.showcase__navItem}>
              <a href="#organisms" className={styles.showcase__navLink}>Organisms</a>
            </li>
            <li className={styles.showcase__navItem}>
              <a href="#templates" className={styles.showcase__navLink}>Templates</a>
            </li>
          </ul>
        </div>
      </nav>

      <main className={styles.showcase__main}>
        <div className={styles.showcase__container}>
          {/* Atoms Section */}
          <section id="atoms" className={styles.showcase__section}>
            <h2 className={styles.showcase__sectionTitle}>Atoms</h2>
            <p className={styles.showcase__sectionDescription}>
              Basic building blocks of the design system - the smallest functional units
            </p>
            
            <div className={styles.showcase__grid}>
              {/* Button Component */}
              <div className={styles.showcase__componentShowcase}>
                <div className={styles.showcase__componentHeader}>
                  <h3 className={styles.showcase__componentName}>Button</h3>
                  <span className={styles.showcase__componentPath}>
                    components/atoms/Button
                  </span>
                </div>
                
                <div className={styles.showcase__componentDemo}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                    {/* Single-line variants */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                      <Button onClick={() => console.log('Primary clicked')}>
                        Primary
                      </Button>
                      <Button variant="secondary" onClick={() => console.log('Secondary clicked')}>
                        Secondary
                      </Button>
                      <Button variant="link" onClick={() => console.log('Link clicked')}>
                        Link Style
                      </Button>
                      <Button variant="inactive">
                        Inactive
                      </Button>
                    </div>
                    
                    {/* Multi-line variants */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                      <Button 
                        multiline
                        labelTop="Add to Cart"
                        label="$9.99"
                        onClick={() => console.log('Add to cart clicked')}
                      />
                      <Button 
                        multiline
                        variant="secondary"
                        labelTop="View All"
                        label="Products"
                        onClick={() => console.log('View products clicked')}
                      />
                    </div>
                  </div>
                </div>
                
                <div className={styles.showcase__componentCode}>
                  <pre>{`// Basic usage
<Button onClick={handleClick}>
  Click me
</Button>

// Variants
<Button variant="secondary">Secondary</Button>
<Button variant="link">Link Style</Button>
<Button variant="inactive">Inactive</Button>

// Multi-line buttons
<Button 
  multiline
  labelTop="Add to Cart"
  label="$9.99"
  onClick={handleAddToCart}
/>

// With custom props
<Button 
  type="submit"
  disabled={isLoading}
  className="custom-class"
  ariaLabel="Save and continue"
>
  Save & Continue
</Button>`}</pre>
                </div>
              </div>
              
              <div className={styles.showcase__placeholder}>
                <h3 className={styles.showcase__componentTitle}>Inputs</h3>
                <p className={styles.showcase__componentDescription}>
                  Input components will be displayed here
                </p>
              </div>
              
              <div className={styles.showcase__placeholder}>
                <h3 className={styles.showcase__componentTitle}>Typography</h3>
                <p className={styles.showcase__componentDescription}>
                  Typography components will be displayed here
                </p>
              </div>
            </div>
          </section>

          {/* Molecules Section */}
          <section id="molecules" className={styles.showcase__section}>
            <h2 className={styles.showcase__sectionTitle}>Molecules</h2>
            <p className={styles.showcase__sectionDescription}>
              Simple combinations of atoms working together as a unit
            </p>
            
            <div className={styles.showcase__grid}>
              <div className={styles.showcase__placeholder}>
                <h3 className={styles.showcase__componentTitle}>Form Fields</h3>
                <p className={styles.showcase__componentDescription}>
                  Form field components will be displayed here
                </p>
              </div>
              
              <div className={styles.showcase__placeholder}>
                <h3 className={styles.showcase__componentTitle}>Cards</h3>
                <p className={styles.showcase__componentDescription}>
                  Card components will be displayed here
                </p>
              </div>
            </div>
          </section>

          {/* Organisms Section */}
          <section id="organisms" className={styles.showcase__section}>
            <h2 className={styles.showcase__sectionTitle}>Organisms</h2>
            <p className={styles.showcase__sectionDescription}>
              Complex components composed of groups of molecules and/or atoms
            </p>
            
            <div className={styles.showcase__grid}>
              <div className={styles.showcase__placeholder}>
                <h3 className={styles.showcase__componentTitle}>Navigation</h3>
                <p className={styles.showcase__componentDescription}>
                  Navigation components will be displayed here
                </p>
              </div>
              
              <div className={styles.showcase__placeholder}>
                <h3 className={styles.showcase__componentTitle}>Product Lists</h3>
                <p className={styles.showcase__componentDescription}>
                  Product list components will be displayed here
                </p>
              </div>
            </div>
          </section>

          {/* Templates Section */}
          <section id="templates" className={styles.showcase__section}>
            <h2 className={styles.showcase__sectionTitle}>Templates</h2>
            <p className={styles.showcase__sectionDescription}>
              Page-level layouts that place components into a layout and articulate the design's underlying content structure
            </p>
            
            <div className={styles.showcase__grid}>
              <div className={styles.showcase__placeholder}>
                <h3 className={styles.showcase__componentTitle}>Page Layouts</h3>
                <p className={styles.showcase__componentDescription}>
                  Page layout templates will be displayed here
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ShowcasePage;