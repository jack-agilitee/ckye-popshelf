'use client';

import React, { useState } from 'react';
import Button from '@/components/atoms/Button/Button';
import Chip from '@/components/atoms/Chip/Chip';
import RadioButtonSelector from '@/components/atoms/RadioButtonSelector/RadioButtonSelector';
import QuantitySelector from '@/components/molecules/QuantitySelector/QuantitySelector';
import styles from './page.module.scss';

const RadioButtonSelectorDemo = () => {
  const [selectedValue, setSelectedValue] = useState('option2');
  const [selectedPlan, setSelectedPlan] = useState('premium');
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Basic radio group */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <span style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Basic Radio Group</span>
        <RadioButtonSelector
          id="option1"
          name="basic-group"
          value="option1"
          label="Option 1"
          checked={selectedValue === 'option1'}
          onChange={setSelectedValue}
        />
        <RadioButtonSelector
          id="option2"
          name="basic-group"
          value="option2"
          label="Option 2"
          checked={selectedValue === 'option2'}
          onChange={setSelectedValue}
          rightContent="check"
        />
        <RadioButtonSelector
          id="option3"
          name="basic-group"
          value="option3"
          label="Option 3"
          disabled
          rightContent="status"
          statusText="unavailable"
        />
      </div>
      
      {/* Pricing options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <span style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Subscription Plans</span>
        <RadioButtonSelector
          id="basic-plan"
          name="plans"
          value="basic"
          label="Basic Plan"
          checked={selectedPlan === 'basic'}
          onChange={setSelectedPlan}
          rightContent="price"
          price="$9.99"
        />
        <RadioButtonSelector
          id="premium-plan"
          name="plans"
          value="premium"
          label="Premium Plan"
          checked={selectedPlan === 'premium'}
          onChange={setSelectedPlan}
          rightContent="price"
          price="$19.99"
        />
        <RadioButtonSelector
          id="enterprise-plan"
          name="plans"
          value="enterprise"
          label="Enterprise Plan"
          checked={selectedPlan === 'enterprise'}
          onChange={setSelectedPlan}
          rightContent="price"
          price="Contact Us"
        />
      </div>
    </div>
  );
};

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
                      <Button variant="tertiary" onClick={() => console.log('Tertiary clicked')}>
                        Tertiary
                      </Button>
                      <Button disabled onClick={() => console.log('This should not fire')}>
                        Disabled
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
<Button variant="tertiary">Tertiary</Button>
<Button disabled>Disabled</Button>

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
              
              {/* Chip Component */}
              <div className={styles.showcase__componentShowcase}>
                <div className={styles.showcase__componentHeader}>
                  <h3 className={styles.showcase__componentName}>Chip</h3>
                  <span className={styles.showcase__componentPath}>
                    components/atoms/Chip
                  </span>
                </div>
                
                <div className={styles.showcase__componentDemo}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                    {/* All variants */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                      <Chip label="FILTERS" onClick={() => console.log('Solid chip clicked')} />
                      <Chip variant="outlined" label="CATEGORY" onClick={() => console.log('Outlined chip clicked')} />
                      <Chip label="PRICE: $10-$20" icon="/delete.svg" onClick={() => console.log('Remove chip clicked')} />
                    </div>
                    
                    {/* Example use cases */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '16px' }}>
                      <Chip label="NEW ARRIVALS" icon="/delete.svg" onClick={() => console.log('Remove filter')} />
                      <Chip label="UNDER $25" icon="/delete.svg" onClick={() => console.log('Remove filter')} />
                      <Chip label="IN STOCK" icon="/delete.svg" onClick={() => console.log('Remove filter')} />
                    </div>
                  </div>
                </div>
                
                <div className={styles.showcase__componentCode}>
                  <pre>{`// Basic usage
<Chip onClick={handleClick} />

// With custom label
<Chip label="NEW ARRIVALS" />

// Variants
<Chip variant="solid" label="FILTERS" />
<Chip variant="outlined" label="CATEGORY" />

// With icon
<Chip label="PRICE: $10-$20" icon="/delete.svg" />

// Filter implementation
{filters.map(filter => (
  <Chip
    key={filter}
    label={filter}
    icon="/delete.svg"
    onClick={() => removeFilter(filter)}
  />
))}

// Category selector
<Chip 
  variant={selected ? 'solid' : 'outlined'}
  label="HOME DECOR"
  onClick={() => setCategory('home')}
/>`}</pre>
                </div>
              </div>
              
              {/* RadioButtonSelector Component */}
              <div className={styles.showcase__componentShowcase}>
                <div className={styles.showcase__componentHeader}>
                  <h3 className={styles.showcase__componentName}>RadioButtonSelector</h3>
                  <span className={styles.showcase__componentPath}>
                    components/atoms/RadioButtonSelector
                  </span>
                </div>
                
                <div className={styles.showcase__componentDemo}>
                  <RadioButtonSelectorDemo />
                </div>
                
                <div className={styles.showcase__componentCode}>
                  <pre>{`// Basic usage
<RadioButtonSelector
  id="option1"
  name="group"
  value="option1"
  label="Option 1"
  checked={selected === 'option1'}
  onChange={setSelected}
/>

// With check indicator
<RadioButtonSelector
  id="option2"
  name="group"
  value="option2"
  label="Selected Option"
  checked={true}
  onChange={setSelected}
  rightContent="check"
/>

// With price
<RadioButtonSelector
  id="plan"
  name="subscription"
  value="premium"
  label="Premium Plan"
  checked={selected === 'premium'}
  onChange={setSelected}
  rightContent="price"
  price="$19.99"
/>

// Disabled with status
<RadioButtonSelector
  id="unavailable"
  name="group"
  value="unavailable"
  label="Out of Stock"
  disabled
  rightContent="status"
  statusText="Currently unavailable"
/>

// Radio group implementation
const RadioGroup = () => {
  const [value, setValue] = useState('option1');
  
  return (
    <div role="radiogroup">
      {options.map(option => (
        <RadioButtonSelector
          key={option.id}
          id={option.id}
          name="group"
          value={option.value}
          label={option.label}
          checked={value === option.value}
          onChange={setValue}
        />
      ))}
    </div>
  );
};`}</pre>
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
              {/* QuantitySelector Component */}
              <div className={styles.showcase__componentShowcase}>
                <div className={styles.showcase__componentHeader}>
                  <h3 className={styles.showcase__componentName}>QuantitySelector</h3>
                  <span className={styles.showcase__componentPath}>
                    components/molecules/QuantitySelector
                  </span>
                </div>
                
                <div className={styles.showcase__componentDemo}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
                    {/* Default state (qty = 1) */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#666' }}>Default (qty = 1)</span>
                      <QuantitySelector
                        initialQuantity={1}
                        onIncrement={() => console.log('Increment')}
                        onDecrement={() => console.log('Decrement')}
                        onDelete={() => console.log('Delete')}
                      />
                    </div>
                    
                    {/* Higher quantity */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#666' }}>Higher quantity</span>
                      <QuantitySelector
                        initialQuantity={5}
                        onIncrement={() => console.log('Increment')}
                        onDecrement={() => console.log('Decrement')}
                        onDelete={() => console.log('Delete')}
                      />
                    </div>
                    
                    {/* With max limit */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#666' }}>With max limit (3)</span>
                      <QuantitySelector
                        initialQuantity={3}
                        maxQuantity={3}
                        onIncrement={() => console.log('Cannot increment - at max')}
                        onDecrement={() => console.log('Decrement')}
                        onDelete={() => console.log('Delete')}
                      />
                    </div>
                  </div>
                </div>
                
                <div className={styles.showcase__componentCode}>
                  <pre>{`// Basic usage
<QuantitySelector
  initialQuantity={1}
  onIncrement={handleIncrement}
  onDecrement={handleDecrement}
  onDelete={handleDelete}
/>

// With constraints
<QuantitySelector
  initialQuantity={5}
  minQuantity={1}
  maxQuantity={10}
  onIncrement={handleIncrement}
  onDecrement={handleDecrement}
  onDelete={handleDelete}
/>

// In a cart item
const CartItem = ({ item }) => {
  return (
    <QuantitySelector
      initialQuantity={item.quantity}
      onIncrement={() => updateQuantity(item.id, item.quantity + 1)}
      onDecrement={() => updateQuantity(item.id, item.quantity - 1)}
      onDelete={() => removeFromCart(item.id)}
    />
  );
};`}</pre>
                </div>
              </div>
              
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
              Page-level layouts that place components into a layout and articulate the design&apos;s underlying content structure
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