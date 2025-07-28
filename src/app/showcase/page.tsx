'use client';

import React, { useState } from 'react';
import Button from '@/components/atoms/Button/Button';
import Chip from '@/components/atoms/Chip/Chip';
import Dropdown, { DropdownOption } from '@/components/atoms/Dropdown/Dropdown';
import RadioButtonSelector from '@/components/atoms/RadioButtonSelector/RadioButtonSelector';
import TextField from '@/components/atoms/TextField/TextField';
import CartHeader from '@/components/atoms/CartHeader/CartHeader';
import PointsEarned from '@/components/atoms/PointsEarned/PointsEarned';
import Checkbox from '@/components/atoms/Checkbox/Checkbox';
import ReviewStars from '@/components/atoms/ReviewStars/ReviewStars';
import ContentBlock from '@/components/atoms/ContentBlock/ContentBlock';
import QuantitySelector from '@/components/molecules/QuantitySelector/QuantitySelector';
import CategoryTile from '@/components/molecules/CategoryTile/CategoryTile';
import OrderStatus, { OrderStatusType } from '@/components/molecules/OrderStatus/OrderStatus';
import LocationPicker from '@/components/molecules/LocationPicker/LocationPicker';
import ProductCard from '@/components/molecules/ProductCard/ProductCard';
import MiniProductCard from '@/components/molecules/MiniProductCard/MiniProductCard';
import ProductCards from '@/components/molecules/ProductCards/ProductCards';
import ProductNamePrice from '@/components/molecules/ProductNamePrice/ProductNamePrice';
import OrderSummary from '@/components/organisms/OrderSummary/OrderSummary';
import styles from './page.module.scss';

const DropdownDemo = () => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('electronics');
  const [selectedShipping, setSelectedShipping] = useState('');

  const sizeOptions: DropdownOption[] = [
    { value: 'xs', label: 'Extra Small' },
    { value: 's', label: 'Small' },
    { value: 'm', label: 'Medium' },
    { value: 'l', label: 'Large' },
    { value: 'xl', label: 'Extra Large' },
  ];

  const categoryOptions: DropdownOption[] = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing & Accessories' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'toys', label: 'Toys & Games' },
    { value: 'books', label: 'Books & Media' },
  ];

  const shippingOptions: DropdownOption[] = [
    { value: 'standard', label: 'Standard (5-7 days)' },
    { value: 'express', label: 'Express (2-3 days)' },
    { value: 'overnight', label: 'Overnight', disabled: true },
    { value: 'pickup', label: 'Store Pickup' },
  ];

  return (
    <div className={styles.showcase__demoLayout}>
      {/* Basic dropdown */}
      <div style={{ maxWidth: '300px' }}>
        <Dropdown
          id="size-dropdown"
          label="Size"
          placeholder="Select a size"
          options={sizeOptions}
          value={selectedSize}
          onChange={setSelectedSize}
        />
      </div>

      {/* Dropdown with pre-selected value */}
      <div style={{ maxWidth: '300px' }}>
        <Dropdown
          id="category-dropdown"
          label="Category"
          options={categoryOptions}
          value={selectedCategory}
          onChange={setSelectedCategory}
          required
        />
      </div>

      {/* Dropdown with disabled options */}
      <div style={{ maxWidth: '300px' }}>
        <Dropdown
          id="shipping-dropdown"
          label="Shipping Method"
          placeholder="Choose shipping"
          options={shippingOptions}
          value={selectedShipping}
          onChange={setSelectedShipping}
          error={!selectedShipping}
          errorMessage="Please select a shipping method"
        />
      </div>

      {/* Disabled dropdown */}
      <div style={{ maxWidth: '300px' }}>
        <Dropdown
          id="disabled-dropdown"
          label="Disabled Dropdown"
          options={sizeOptions}
          value="m"
          onChange={() => {}}
          disabled
        />
      </div>
    </div>
  );
};

const TextFieldDemo = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  
  return (
    <div className={styles.showcase__demoLayout}>
      {/* Basic text field */}
      <div style={{ maxWidth: '400px' }}>
        <TextField
          id="name-field"
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          onChange={setName}
        />
      </div>

      {/* Email field with validation */}
      <div style={{ maxWidth: '400px' }}>
        <TextField
          id="email-field"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={setEmail}
          required
          error={email.length > 0 && !email.includes('@')}
          errorMessage="Please enter a valid email address"
        />
      </div>

      {/* Password field */}
      <div style={{ maxWidth: '400px' }}>
        <TextField
          id="password-field"
          label="Password"
          type="password"
          placeholder="Enter secure password"
          value={password}
          onChange={setPassword}
          required
          error={password.length > 0 && password.length < 8}
          errorMessage="Password must be at least 8 characters"
        />
      </div>

      {/* Phone field */}
      <div style={{ maxWidth: '400px' }}>
        <TextField
          id="phone-field"
          label="Phone Number"
          type="tel"
          placeholder="(555) 123-4567"
          value={phone}
          onChange={setPhone}
          maxLength={14}
        />
      </div>

      {/* Disabled field */}
      <div style={{ maxWidth: '400px' }}>
        <TextField
          id="disabled-field"
          label="Disabled Field"
          value="This field is disabled"
          onChange={() => {}}
          disabled
        />
      </div>

      {/* Uncontrolled with default value */}
      <div style={{ maxWidth: '400px' }}>
        <TextField
          id="notes-field"
          label="Additional Notes"
          placeholder="Any additional information..."
          defaultValue="Default text"
          onChange={(value) => console.log('Notes changed:', value)}
        />
      </div>
    </div>
  );
};

const RadioButtonSelectorDemo = () => {
  const [selectedValue, setSelectedValue] = useState('option2');
  const [selectedPlan, setSelectedPlan] = useState('premium');
  
  return (
    <div className={styles.showcase__demoLayout}>
      {/* Basic radio group */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '45%' }}>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '45%' }}>
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

const CheckboxDemo = () => {
  const [formState, setFormState] = useState({
    terms: false,
    newsletter: true,
    notifications: false,
    analytics: true,
    marketing: false
  });

  const handleCheckboxChange = (field: keyof typeof formState) => (checked: boolean) => {
    setFormState(prev => ({ ...prev, [field]: checked }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Basic checkboxes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>Basic Checkboxes</h4>
        <Checkbox
          label="Accept terms and conditions"
          checked={formState.terms}
          onChange={handleCheckboxChange('terms')}
        />
        <Checkbox
          label="Subscribe to newsletter"
          checked={formState.newsletter}
          onChange={handleCheckboxChange('newsletter')}
        />
        <Checkbox
          label="Enable notifications"
          checked={formState.notifications}
          onChange={handleCheckboxChange('notifications')}
        />
      </div>

      {/* Disabled states */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>Disabled States</h4>
        <Checkbox
          label="Disabled unchecked"
          disabled
        />
        <Checkbox
          label="Disabled checked"
          checked={true}
          disabled
        />
      </div>

      {/* Form example */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>Form Example</h4>
        <Checkbox
          id="analytics-checkbox"
          name="analytics"
          label="Allow analytics tracking"
          checked={formState.analytics}
          onChange={handleCheckboxChange('analytics')}
        />
        <Checkbox
          id="marketing-checkbox"
          name="marketing"
          label="Receive marketing emails"
          checked={formState.marketing}
          onChange={handleCheckboxChange('marketing')}
          disabled={!formState.newsletter}
        />
      </div>

      {/* Current state display */}
      <div style={{ marginTop: '8px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
          Current state: {JSON.stringify(formState, null, 2)}
        </p>
      </div>
    </div>
  );
};

const CategoryTileDemo = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = [
    { id: 'home', name: 'Home & Garden', image: '/categories/category-home.jpg' },
    { id: 'electronics', name: 'Electronics', image: '/categories/category-electronics.jpg' },
    { id: 'fashion', name: 'Fashion', image: '/categories/category-fashion.jpg' },
    { id: 'toys', name: 'Toys & Games', image: '/categories/category-toys.jpg' },
    { id: 'beauty', name: 'Beauty', image: '/categories/category-beauty.jpg' },
    { id: 'sports', name: 'Sports', image: '/categories/category-sports.jpg' },
  ];

  return (
    <div className={styles.showcase__demoLayout}>
      {categories.map((category) => (
        <CategoryTile
          key={category.id}
          label={category.name}
          imageSrc={category.image}
          onClick={() => {
            setSelectedCategory(category.id);
            console.log(`Selected category: ${category.name}`);
          }}
          selected={selectedCategory === category.id}
        />
      ))}
    </div>
  );
};

const OrderStatusDemo = () => {
  const storeInfo = {
    storeName: 'Your store',
    storeAddress: '315 N Main St, Goodlettsville, TN 37072',
    closingTime: '9pm'
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
      {/* No Order Status */}
      <div>
        <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>No Order</h4>
        <OrderStatus
          status={OrderStatusType.NO_ORDER}
          {...storeInfo}
          onEdit={() => console.log('Edit store location')}
        />
      </div>

      {/* Order Received Status */}
      <div>
        <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>Order Received</h4>
        <OrderStatus
          status={OrderStatusType.ORDER_RECEIVED}
          {...storeInfo}
          onEdit={() => console.log('Edit store location')}
        />
      </div>

      {/* Ready to Pickup Status */}
      <div>
        <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>Ready to Pickup</h4>
        <OrderStatus
          status={OrderStatusType.READY_TO_PICKUP}
          {...storeInfo}
          onEdit={() => console.log('Edit store location')}
        />
      </div>

      {/* Multiple Orders Status */}
      <div>
        <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>Multiple Orders</h4>
        <OrderStatus
          status={OrderStatusType.MULTIPLE_ORDERS}
          {...storeInfo}
          onEdit={() => console.log('Edit store location')}
          onViewOrders={() => console.log('View your orders')}
        />
      </div>
    </div>
  );
};

const LocationPickerDemo = () => {
  const [selectedLocation, setSelectedLocation] = useState('315 N Main St, Atlanta GA');

  const locations = [
    '315 N Main St, Atlanta GA',
    '123 Oak Avenue, Nashville TN 37201',
    '456 Elm Street, Memphis TN 38103',
    '789 Pine Road, Knoxville TN 37902',
  ];

  const handleEditLocation = () => {
    // Simulate location change
    const currentIndex = locations.indexOf(selectedLocation);
    const nextIndex = (currentIndex + 1) % locations.length;
    setSelectedLocation(locations[nextIndex]);
    console.log('Location changed to:', locations[nextIndex]);
  };

  return (
    <div className={styles.showcase__demoLayout}>
      {/* Default usage */}
      <div style={{ maxWidth: '400px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>Default Pickup Location</h4>
        <LocationPicker
          address={selectedLocation}
          onEdit={handleEditLocation}
        />
      </div>

      {/* With custom label */}
      <div style={{ maxWidth: '400px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>Delivery Address</h4>
        <LocationPicker
          label="Delivery address"
          address="456 Oak St, Suite 200, Nashville TN"
          onEdit={() => console.log('Edit delivery address')}
          editAriaLabel="Change delivery address"
        />
      </div>

      {/* Long address */}
      <div style={{ maxWidth: '400px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>Long Address</h4>
        <LocationPicker
          label="Ship to"
          address="1234 Very Long Street Name, Building B, Apt 567, Some City, State 12345"
          onEdit={() => console.log('Edit shipping address')}
        />
      </div>

      {/* Different label */}
      <div style={{ maxWidth: '400px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>Store Location</h4>
        <LocationPicker
          label="Your selected store"
          address="PopShelf #123, Goodlettsville TN"
          onEdit={() => console.log('Change store')}
          editAriaLabel="Select a different store"
        />
      </div>
    </div>
  );
};

const ProductCardDemo = () => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    product1: 1,
    product2: 2,
    product3: 1,
  });

  const updateQuantity = (productId: string, newQuantity: number) => {
    setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
    console.log(`Updated ${productId} quantity to ${newQuantity}`);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
      {/* In stock product */}
      <div>
        <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>In Stock Product</h4>
        <ProductCard
          name="Round Gold Metal Wall Mirror"
          price={9.00}
          regularPrice={11.00}
          stockQuantity={15}
          initialQuantity={quantities.product1}
          onClose={() => console.log('Remove product 1')}
          onIncrement={() => updateQuantity('product1', quantities.product1 + 1)}
          onDecrement={() => updateQuantity('product1', Math.max(1, quantities.product1 - 1))}
          onDelete={() => console.log('Delete product 1')}
        />
      </div>

      {/* Product with discount */}
      <div>
        <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>Product with Discount</h4>
        <ProductCard
          name="Decorative Ceramic Planter with Drainage Hole and Saucer"
          price={12.99}
          regularPrice={24.99}
          stockQuantity={8}
          initialQuantity={quantities.product2}
          onClose={() => console.log('Remove product 2')}
          onIncrement={() => updateQuantity('product2', quantities.product2 + 1)}
          onDecrement={() => updateQuantity('product2', Math.max(1, quantities.product2 - 1))}
          onDelete={() => console.log('Delete product 2')}
        />
      </div>

      {/* Out of stock product */}
      <div>
        <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>Out of Stock</h4>
        <ProductCard
          name="Vintage Table Lamp with Fabric Shade"
          price={45.00}
          regularPrice={65.00}
          outOfStock={true}
          onClose={() => console.log('Remove out of stock product')}
        />
      </div>

      {/* Low stock product */}
      <div>
        <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>Low Stock</h4>
        <ProductCard
          name="Set of 4 Storage Baskets"
          price={18.00}
          stockQuantity={2}
          initialQuantity={quantities.product3}
          onClose={() => console.log('Remove product 3')}
          onIncrement={() => updateQuantity('product3', quantities.product3 + 1)}
          onDecrement={() => updateQuantity('product3', Math.max(1, quantities.product3 - 1))}
          onDelete={() => console.log('Delete product 3')}
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
                  <div className={styles.showcase__demoLayout}>
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
                  <div className={styles.showcase__demoLayout}>
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

              {/* Dropdown Component */}
              <div className={styles.showcase__componentShowcase}>
                <div className={styles.showcase__componentHeader}>
                  <h3 className={styles.showcase__componentName}>Dropdown</h3>
                  <span className={styles.showcase__componentPath}>
                    components/atoms/Dropdown
                  </span>
                </div>
                
                <div className={styles.showcase__componentDemo}>
                  <DropdownDemo />
                </div>
                
                <div className={styles.showcase__componentCode}>
                  <pre>{`// Basic usage
import Dropdown, { DropdownOption } from '@/components/atoms/Dropdown/Dropdown';

const options: DropdownOption[] = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
];

<Dropdown
  id="size"
  label="Size"
  options={options}
  value={selected}
  onChange={setSelected}
/>

// With placeholder
<Dropdown
  id="category"
  placeholder="Choose a category"
  options={categoryOptions}
  value={category}
  onChange={setCategory}
/>

// With disabled options
const shippingOptions: DropdownOption[] = [
  { value: 'standard', label: 'Standard' },
  { value: 'express', label: 'Express' },
  { value: 'overnight', label: 'Overnight', disabled: true },
];

// With error state
<Dropdown
  id="required-field"
  label="Required Field"
  options={options}
  value={value}
  onChange={setValue}
  required
  error={!value}
  errorMessage="This field is required"
/>

// Disabled state
<Dropdown
  id="disabled"
  label="Disabled"
  options={options}
  value="medium"
  disabled
/>`}</pre>
                </div>
              </div>
              
              {/* TextField Component */}
              <div className={styles.showcase__componentShowcase}>
                <div className={styles.showcase__componentHeader}>
                  <h3 className={styles.showcase__componentName}>TextField</h3>
                  <span className={styles.showcase__componentPath}>
                    components/atoms/TextField
                  </span>
                </div>
                
                <div className={styles.showcase__componentDemo}>
                  <TextFieldDemo />
                </div>
                
                <div className={styles.showcase__componentCode}>
                  <pre>{`// Basic usage
import TextField from '@/components/atoms/TextField/TextField';

<TextField
  id="name"
  label="Name"
  placeholder="Enter your name"
  value={name}
  onChange={setName}
/>

// With validation
<TextField
  id="email"
  label="Email"
  type="email"
  placeholder="you@example.com"
  value={email}
  onChange={setEmail}
  required
  error={!isValidEmail}
  errorMessage="Please enter a valid email"
/>

// Password field
<TextField
  id="password"
  label="Password"
  type="password"
  value={password}
  onChange={setPassword}
  required
  maxLength={20}
  error={passwordError}
  errorMessage="Password must be at least 8 characters"
/>

// With all features
<TextField
  id="notes"
  label="Notes"
  placeholder="Additional notes..."
  value={notes}
  onChange={setNotes}
  onFocus={() => console.log('Focused')}
  onBlur={() => console.log('Blurred')}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      submitForm();
    }
  }}
  autoComplete="off"
  aria-describedby="notes-help"
/>

// Uncontrolled component
<TextField
  id="search"
  type="search"
  placeholder="Search..."
  defaultValue=""
  onChange={(value) => console.log('Search:', value)}
/>`}</pre>
                </div>
              </div>
              
              {/* CartHeader Component */}
              <div className={styles.showcase__componentShowcase}>
                <div className={styles.showcase__componentHeader}>
                  <h3 className={styles.showcase__componentName}>CartHeader</h3>
                  <span className={styles.showcase__componentPath}>
                    components/atoms/CartHeader
                  </span>
                </div>
                
                <div className={styles.showcase__componentDemo}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                    {/* Basic usage */}
                    <div style={{ width: '100%' }}>
                      <CartHeader
                        itemCount={3}
                        totalPrice={40.64}
                      />
                    </div>
                    
                    {/* With custom aria label */}
                    <div style={{ width: '100%' }}>
                      <CartHeader
                        itemCount={5}
                        totalPrice={125.99}
                        ariaLabel="Shopping cart summary"
                      />
                    </div>
                    
                    {/* Different currency */}
                    <div style={{ width: '100%' }}>
                      <CartHeader
                        itemCount={10}
                        totalPrice={89.50}
                        currencySymbol="€"
                      />
                    </div>
                    
                    {/* Empty cart */}
                    <div style={{ width: '100%' }}>
                      <CartHeader
                        itemCount={0}
                        totalPrice={0}
                      />
                    </div>
                  </div>
                </div>
                
                <div className={styles.showcase__componentCode}>
                  <pre>{`// Basic usage
import CartHeader from '@/components/atoms/CartHeader/CartHeader';

<CartHeader
  itemCount={3}
  totalPrice={40.64}
/>

// With custom aria label
<CartHeader
  itemCount={5}
  totalPrice={125.99}
  ariaLabel="Shopping cart summary"
/>

// Custom currency
<CartHeader
  itemCount={10}
  totalPrice={89.50}
  currencySymbol="€"
/>

// In header layout
const AppHeader = () => {
  const { itemCount, totalPrice } = useCart();
  
  return (
    <header className="app-header">
      <Logo />
      <Navigation />
      <CartHeader
        itemCount={itemCount}
        totalPrice={totalPrice}
      />
    </header>
  );
};`}</pre>
                </div>
              </div>
              
              {/* PointsEarned Component */}
              <div className={styles.showcase__componentShowcase}>
                <div className={styles.showcase__componentHeader}>
                  <h3 className={styles.showcase__componentName}>PointsEarned</h3>
                  <span className={styles.showcase__componentPath}>
                    components/atoms/PointsEarned
                  </span>
                </div>
                
                <div className={styles.showcase__componentDemo}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', margin: '0 auto' }}>
                    {/* Basic usage */}
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>100 Points</h4>
                      <PointsEarned points={100} />
                    </div>
                    
                    {/* Large points */}
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>Large Points Value</h4>
                      <PointsEarned points={5250} />
                    </div>
                    
                    {/* Zero points */}
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>No Points</h4>
                      <PointsEarned points={0} />
                    </div>
                  </div>
                </div>
                
                <div className={styles.showcase__componentCode}>
                  <pre>{`// Basic usage
import PointsEarned from '@/components/atoms/PointsEarned/PointsEarned';

<PointsEarned points={100} />

// Large number of points
<PointsEarned points={5250} />

// Zero points
<PointsEarned points={0} />

// In checkout flow
const CheckoutSummary = () => {
  const { subtotal, pointsEarned } = useCheckout();

  return (
    <div className="checkout-summary">
      <h2>Order Summary</h2>
      <div className="subtotal">Subtotal: $\{subtotal}</div>
      <PointsEarned points={pointsEarned} />
      <button>Complete Order</button>
    </div>
  );
};

// With rewards membership check
const OrderRewards = () => {
  const { isRewardsMember, calculatedPoints } = useRewards();

  if (!isRewardsMember) {
    return <JoinRewardsPrompt />;
  }

  return (
    <div className="order-rewards">
      <PointsEarned points={calculatedPoints} />
      <p>Current balance: {currentPoints} points</p>
    </div>
  );
};`}</pre>
                </div>
              </div>
              
              {/* Checkbox Component */}
              <div className={styles.showcase__componentShowcase}>
                <div className={styles.showcase__componentHeader}>
                  <h3 className={styles.showcase__componentName}>Checkbox</h3>
                  <span className={styles.showcase__componentPath}>
                    components/atoms/Checkbox
                  </span>
                </div>
                
                <div className={styles.showcase__componentDemo}>
                  <CheckboxDemo />
                </div>
                
                <div className={styles.showcase__componentCode}>
                  <pre>{`// Basic usage
import Checkbox from '@/components/atoms/Checkbox/Checkbox';

<Checkbox
  label="Accept terms and conditions"
  onChange={(checked) => console.log('Checked:', checked)}
/>

// Controlled component
const [isChecked, setIsChecked] = useState(false);

<Checkbox
  label="Subscribe to newsletter"
  checked={isChecked}
  onChange={setIsChecked}
/>

// Disabled state
<Checkbox
  label="This option is unavailable"
  disabled
/>

// With form attributes
<Checkbox
  id="terms-checkbox"
  name="terms"
  label="I agree to the terms of service"
  checked={formData.acceptTerms}
  onChange={(checked) => updateFormData({ acceptTerms: checked })}
/>

// Form integration example
function SettingsForm() {
  const [settings, setSettings] = useState({
    notifications: true,
    marketing: false,
    analytics: true
  });

  const handleChange = (field: string) => (checked: boolean) => {
    setSettings(prev => ({ ...prev, [field]: checked }));
  };

  return (
    <form>
      <Checkbox
        label="Enable notifications"
        checked={settings.notifications}
        onChange={handleChange('notifications')}
      />
      <Checkbox
        label="Receive marketing emails"
        checked={settings.marketing}
        onChange={handleChange('marketing')}
      />
      <Checkbox
        label="Allow analytics"
        checked={settings.analytics}
        onChange={handleChange('analytics')}
      />
    </form>
  );
}`}</pre>
                </div>
              </div>

              {/* ReviewStars Component */}
              <div className={styles.showcase__componentShowcase}>
                <div className={styles.showcase__componentHeader}>
                  <h3 className={styles.showcase__componentName}>ReviewStars</h3>
                  <span className={styles.showcase__componentPath}>
                    components/atoms/ReviewStars
                  </span>
                </div>
                
                <div className={styles.showcase__componentDemo}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Rating variations */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>Rating Variations</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ReviewStars rating={0} />
                        <span style={{ fontSize: '12px', color: '#666' }}>0 stars</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ReviewStars rating={1} />
                        <span style={{ fontSize: '12px', color: '#666' }}>1 star</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ReviewStars rating={2.5} />
                        <span style={{ fontSize: '12px', color: '#666' }}>2.5 stars</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ReviewStars rating={3.7} />
                        <span style={{ fontSize: '12px', color: '#666' }}>3.7 stars</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ReviewStars rating={4} />
                        <span style={{ fontSize: '12px', color: '#666' }}>4 stars</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ReviewStars rating={5} />
                        <span style={{ fontSize: '12px', color: '#666' }}>5 stars</span>
                      </div>
                    </div>

                    {/* With review count */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>With Review Count</h4>
                      <ReviewStars rating={4.5} showCount={true} reviewCount={280} />
                      <ReviewStars rating={3.2} showCount={true} reviewCount={1543} />
                      <ReviewStars rating={5} showCount={true} reviewCount={42} />
                    </div>

                    {/* Edge cases */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>Edge Cases</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ReviewStars rating={-1} />
                        <span style={{ fontSize: '12px', color: '#666' }}>Negative rating (clamped to 0)</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ReviewStars rating={10} />
                        <span style={{ fontSize: '12px', color: '#666' }}>Rating {'>'} 5 (clamped to 5)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={styles.showcase__componentCode}>
                  <pre>{`// Basic usage
import ReviewStars from '@/components/atoms/ReviewStars/ReviewStars';

// Simple rating display
<ReviewStars rating={4.5} />

// With review count
<ReviewStars 
  rating={4.5} 
  showCount={true} 
  reviewCount={280} 
/>

// Various ratings
<ReviewStars rating={0} />     // Empty stars
<ReviewStars rating={2.5} />   // Half-filled
<ReviewStars rating={5} />     // Fully filled

// Edge cases (automatically clamped)
<ReviewStars rating={-1} />    // Shows 0 stars
<ReviewStars rating={10} />    // Shows 5 stars

// Custom styling
<ReviewStars 
  rating={3.7} 
  className="custom-stars" 
/>

// Product card example
function ProductCard({ product }: { 
  product: { 
    name: string; 
    rating: number; 
    reviewCount: number; 
    price: number; 
  } 
}) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <ReviewStars 
        rating={product.rating} 
        showCount={true}
        reviewCount={product.reviewCount}
      />
      <p>$\{product.price}</p>
    </div>
  );
}`}</pre>
                </div>
              </div>

              {/* ContentBlock Component */}
              <div className={styles.showcase__componentShowcase}>
                <div className={styles.showcase__componentHeader}>
                  <h3 className={styles.showcase__componentName}>ContentBlock</h3>
                  <span className={styles.showcase__componentPath}>
                    components/atoms/ContentBlock
                  </span>
                </div>
                
                <div className={styles.showcase__componentDemo}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px', margin: '0 auto' }}>
                    {/* Product highlights example */}
                    <ContentBlock
                      title="Highlights"
                      items={[
                        '5.5oz 100% ring spun cotton tee is super soft and comfortable',
                        'Vintage washed and garment dyed for a retro look and feel',
                        'No shrink comfort for a dependable fit wash after wash',
                        'Cotton sourced from American farms'
                      ]}
                    />
                    
                    {/* Features example */}
                    <ContentBlock
                      title="Key Features"
                      items={[
                        'Machine washable for easy care',
                        'Pre-shrunk to minimize shrinkage',
                        'Double-needle stitching for durability',
                        'Tag-free for added comfort'
                      ]}
                    />
                    
                    {/* Short list example */}
                    <ContentBlock
                      title="Package Includes"
                      items={[
                        '1x Premium T-Shirt',
                        'Care instructions card'
                      ]}
                    />
                  </div>
                </div>
                
                <div className={styles.showcase__componentCode}>
                  <pre>{`import ContentBlock from '@/components/atoms/ContentBlock/ContentBlock';

// Basic usage
<ContentBlock
  title="Highlights"
  items={[
    '5.5oz 100% ring spun cotton tee is super soft and comfortable',
    'Vintage washed and garment dyed for a retro look and feel',
    'No shrink comfort for a dependable fit wash after wash',
    'Cotton sourced from American farms'
  ]}
/>

// Product features
<ContentBlock
  title="Key Features"
  items={productFeatures}
/>

// Custom styling
<ContentBlock
  title="Benefits"
  items={benefitsList}
  className="product-benefits"
/>

// Usage in product detail page
function ProductDetails({ product }) {
  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <ContentBlock
        title="Product Highlights"
        items={product.highlights}
      />
      <ContentBlock
        title="Materials & Care"
        items={product.careInstructions}
      />
    </div>
  );
}`}</pre>
                </div>
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
                  <div className={styles.showcase__demoLayout}>
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
              
              {/* CategoryTile Component */}
              <div className={styles.showcase__componentShowcase}>
                <div className={styles.showcase__componentHeader}>
                  <h3 className={styles.showcase__componentName}>CategoryTile</h3>
                  <span className={styles.showcase__componentPath}>
                    components/molecules/CategoryTile
                  </span>
                </div>
                
                <div className={styles.showcase__componentDemo}>
                  <CategoryTileDemo />
                </div>
                
                <div className={styles.showcase__componentCode}>
                  <pre>{`// Basic usage
<CategoryTile
  label="Home & Garden"
  imageSrc="/categories/category-home.jpg"
  onClick={() => console.log('Category selected')}
/>

// With selected state
<CategoryTile
  label="Electronics"
  imageSrc="/categories/category-electronics.jpg"
  onClick={() => selectCategory('electronics')}
  selected={selectedCategory === 'electronics'}
/>

// Category grid implementation
const CategoryGrid = () => {
  const [selectedId, setSelectedId] = useState(null);
  
  const categories = [
    { id: 1, name: 'Home & Garden', image: '/categories/home.jpg' },
    { id: 2, name: 'Electronics', image: '/categories/electronics.jpg' },
    { id: 3, name: 'Fashion', image: '/categories/fashion.jpg' },
    { id: 4, name: 'Toys & Games', image: '/categories/toys.jpg' }
  ];

  return (
    <div className="category-grid">
      {categories.map((category) => (
        <CategoryTile
          key={category.id}
          label={category.name}
          imageSrc={category.image}
          onClick={() => setSelectedId(category.id)}
          selected={selectedId === category.id}
        />
      ))}
    </div>
  );
};`}</pre>
                </div>
              </div>
              
              {/* OrderStatus Component */}
              <div className={styles.showcase__componentShowcase}>
                <div className={styles.showcase__componentHeader}>
                  <h3 className={styles.showcase__componentName}>OrderStatus</h3>
                  <span className={styles.showcase__componentPath}>
                    components/molecules/OrderStatus
                  </span>
                </div>
                
                <div className={styles.showcase__componentDemo}>
                  <OrderStatusDemo />
                </div>
                
                <div className={styles.showcase__componentCode}>
                  <pre>{`// Import with enum
import OrderStatus, { OrderStatusType } from '@/components/molecules/OrderStatus/OrderStatus';

// Basic usage - different status variants
<OrderStatus
  status={OrderStatusType.NO_ORDER}
  storeName="Your store"
  storeAddress="315 N Main St, Goodlettsville, TN 37072"
  closingTime="9pm"
  onEdit={() => handleEditStore()}
/>

<OrderStatus
  status={OrderStatusType.ORDER_RECEIVED}
  storeName="Your store"
  storeAddress="315 N Main St, Goodlettsville, TN 37072"
  closingTime="9pm"
  onEdit={() => handleEditStore()}
/>

<OrderStatus
  status={OrderStatusType.READY_TO_PICKUP}
  storeName="Your store"
  storeAddress="315 N Main St, Goodlettsville, TN 37072"
  closingTime="9pm"
  onEdit={() => handleEditStore()}
/>

// Multiple orders with view orders callback
<OrderStatus
  status={OrderStatusType.MULTIPLE_ORDERS}
  storeName="Your store"
  storeAddress="315 N Main St, Goodlettsville, TN 37072"
  closingTime="9pm"
  onEdit={() => handleEditStore()}
  onViewOrders={() => navigateToOrders()}
/>

// Dynamic status example
const OrderTracker = () => {
  const [status, setStatus] = useState(OrderStatusType.NO_ORDER);
  
  useEffect(() => {
    // Subscribe to order updates
    const unsubscribe = subscribeToOrderStatus((newStatus) => {
      setStatus(newStatus);
    });
    
    return unsubscribe;
  }, []);
  
  return (
    <OrderStatus
      status={status}
      storeName={store.name}
      storeAddress={store.address}
      closingTime={store.closingTime}
      onEdit={handleEditStore}
      onViewOrders={status === OrderStatusType.MULTIPLE_ORDERS ? viewOrders : undefined}
    />
  );
};`}</pre>
                </div>
              </div>
              
              {/* LocationPicker Component */}
              <div className={styles.showcase__componentShowcase}>
                <div className={styles.showcase__componentHeader}>
                  <h3 className={styles.showcase__componentName}>LocationPicker</h3>
                  <span className={styles.showcase__componentPath}>
                    components/molecules/LocationPicker
                  </span>
                </div>
                
                <div className={styles.showcase__componentDemo}>
                  <LocationPickerDemo />
                </div>
                
                <div className={styles.showcase__componentCode}>
                  <pre>{`// Basic usage
<LocationPicker
  address="315 N Main St, Atlanta GA"
  onEdit={() => handleEditLocation()}
/>

// With custom label
<LocationPicker
  label="Delivery address"
  address="123 Delivery St, Nashville TN"
  onEdit={() => openLocationModal()}
/>

// With custom aria label
<LocationPicker
  address="789 Pine Rd, Knoxville TN"
  onEdit={() => handleChangeLocation()}
  editAriaLabel="Change store location"
/>

// Implementation example
const StorePickup = () => {
  const [store, setStore] = useState({
    address: '315 N Main St, Atlanta GA'
  });

  const handleEditLocation = () => {
    // Open store selector modal
    openStoreSelector((newStore) => {
      setStore(newStore);
    });
  };

  return (
    <div className="pickup-section">
      <LocationPicker
        address={store.address}
        onEdit={handleEditLocation}
      />
      <p>Store closes at {store.closingTime}</p>
    </div>
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
              
              {/* ProductCard Component */}
              <div className={styles.showcase__componentShowcase}>
                <div className={styles.showcase__componentHeader}>
                  <h3 className={styles.showcase__componentName}>ProductCard</h3>
                  <span className={styles.showcase__componentPath}>
                    components/molecules/ProductCard
                  </span>
                </div>
                
                <div className={styles.showcase__componentDemo}>
                  <ProductCardDemo />
                </div>
                
                <div className={styles.showcase__componentCode}>
                  <pre>{`// In stock product
<ProductCard
  name="Round Gold Metal Wall Mirror"
  price={9.00}
  stockQuantity={15}
  onClose={() => handleRemoveProduct()}
  onIncrement={() => handleIncrement()}
  onDecrement={() => handleDecrement()}
  onDelete={() => handleDelete()}
/>

// Out of stock product
<ProductCard
  name="Vintage Table Lamp"
  price={45.00}
  outOfStock={true}
  onClose={() => handleRemoveProduct()}
/>

// With discount pricing
<ProductCard
  name="Decorative Throw Pillow"
  price={12.99}
  regularPrice={19.99}
  stockQuantity={8}
  initialQuantity={2}
  onClose={() => handleRemoveProduct()}
  onIncrement={() => handleIncrement()}
  onDecrement={() => handleDecrement()}
  onDelete={() => handleDelete()}
/>

// Shopping cart implementation
const ShoppingCart = () => {
  const { items, updateQuantity, removeItem } = useCart();

  return (
    <div className="cart-items">
      {items.map((item) => (
        <ProductCard
          key={item.id}
          name={item.name}
          image={item.image}
          price={item.salePrice}
          regularPrice={item.originalPrice}
          stockQuantity={item.availableStock}
          initialQuantity={item.quantity}
          outOfStock={item.availableStock === 0}
          onClose={() => removeItem(item.id)}
          onIncrement={() => updateQuantity(item.id, item.quantity + 1)}
          onDecrement={() => updateQuantity(item.id, item.quantity - 1)}
          onDelete={() => removeItem(item.id)}
        />
      ))}
    </div>
  );
};`}</pre>
                </div>
              </div>

              {/* MiniProductCard Component */}
              <div className={styles.showcase__componentShowcase}>
                <div className={styles.showcase__componentHeader}>
                  <h3 className={styles.showcase__componentName}>MiniProductCard</h3>
                  <span className={styles.showcase__componentPath}>
                    components/molecules/MiniProductCard
                  </span>
                </div>
                
                <div className={styles.showcase__componentDemo}>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {/* In stock example */}
                    <MiniProductCard
                      name="Party Balloon Set"
                      price={12.99}
                      imageUrl="/categories/product-balloon.png"
                      imageAlt="Colorful party balloons"
                      inStock={true}
                      onAddToCart={() => console.log('Add to cart: Party Balloon Set')}
                      onViewDetails={() => console.log('View details: Party Balloon Set')}
                    />
                    
                    {/* Out of stock example */}
                    <MiniProductCard
                      name="Unicorn Themed Party Supplies Bundle with Decorations"
                      price={24.99}
                      imageUrl="/categories/product-balloon.png"
                      imageAlt="Unicorn party supplies"
                      inStock={false}
                      onAddToCart={() => console.log('Add to cart: Unicorn Bundle')}
                      onViewDetails={() => console.log('View details: Unicorn Bundle')}
                    />
                  </div>
                </div>
                
                <div className={styles.showcase__componentCode}>
                  <pre>{`import MiniProductCard from '@/components/molecules/MiniProductCard/MiniProductCard';

// In stock product
<MiniProductCard
  name="Party Balloon Set"
  price={12.99}
  imageUrl="/categories/product-balloon.png"
  imageAlt="Colorful party balloons"
  inStock={true}
  onAddToCart={() => handleAddToCart('balloon-set')}
  onViewDetails={() => handleViewDetails('balloon-set')}
/>

// Out of stock product
<MiniProductCard
  name="Unicorn Pinata"
  price={24.99}
  imageUrl="/categories/product-pinata.png"
  imageAlt="Rainbow unicorn pinata"
  inStock={false}
  onAddToCart={() => handleAddToCart('unicorn-pinata')}
  onViewDetails={() => handleViewDetails('unicorn-pinata')}
/>

// Product grid implementation
const ProductGrid = () => {
  const { products } = useProducts();
  
  return (
    <div className="product-grid">
      {products.map((product) => (
        <MiniProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          imageUrl={product.image}
          imageAlt={product.name}
          inStock={product.stock > 0}
          onAddToCart={() => addToCart(product.id)}
          onViewDetails={() => navigateToProduct(product.id)}
        />
      ))}
    </div>
  );
};`}</pre>
                </div>
              </div>

              {/* ProductNamePrice Component */}
              <div className={styles.showcase__componentShowcase}>
                <div className={styles.showcase__componentHeader}>
                  <h3 className={styles.showcase__componentName}>ProductNamePrice</h3>
                  <span className={styles.showcase__componentPath}>
                    components/molecules/ProductNamePrice
                  </span>
                </div>
                
                <div className={styles.showcase__componentDemo}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px', margin: '0 auto' }}>
                    {/* Full featured example */}
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>Full Featured</h4>
                      <ProductNamePrice
                        name="Dermott Damask Throw Pillow (Set of 2)"
                        price={9.00}
                        regularPrice={9.50}
                        rating={4.5}
                        reviewCount={280}
                        onShare={() => console.log('Share product clicked')}
                      />
                    </div>
                    
                    {/* Without regular price */}
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>No Regular Price</h4>
                      <ProductNamePrice
                        name="Modern Wall Clock"
                        price={24.99}
                        rating={5}
                        reviewCount={42}
                        onShare={() => console.log('Share product clicked')}
                      />
                    </div>
                    
                    {/* Without share button */}
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>No Share Button</h4>
                      <ProductNamePrice
                        name="Decorative Ceramic Vase"
                        price={15.00}
                        regularPrice={22.00}
                        rating={3.8}
                        reviewCount={156}
                      />
                    </div>
                    
                    {/* Minimal example */}
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>Minimal</h4>
                      <ProductNamePrice
                        name="Basic Item"
                        price={5.99}
                      />
                    </div>
                  </div>
                </div>
                
                <div className={styles.showcase__componentCode}>
                  <pre>{`import ProductNamePrice from '@/components/molecules/ProductNamePrice/ProductNamePrice';

// Full featured usage
<ProductNamePrice
  name="Dermott Damask Throw Pillow (Set of 2)"
  price={9.00}
  regularPrice={9.50}
  rating={4.5}
  reviewCount={280}
  onShare={() => handleShareProduct()}
/>

// Without regular price
<ProductNamePrice
  name="Modern Wall Clock"
  price={24.99}
  rating={5}
  reviewCount={42}
  onShare={() => handleShareProduct()}
/>

// Without share functionality
<ProductNamePrice
  name="Decorative Ceramic Vase"
  price={15.00}
  regularPrice={22.00}
  rating={3.8}
  reviewCount={156}
/>

// Minimal configuration
<ProductNamePrice
  name="Basic Item"
  price={5.99}
/>

// In product detail page
function ProductDetail({ product }) {
  const handleShare = () => {
    navigator.share({
      title: product.name,
      text: \`Check out \${product.name} at PopShelf!\`,
      url: window.location.href
    });
  };

  return (
    <div className="product-detail">
      <ProductImage src={product.image} />
      <ProductNamePrice
        name={product.name}
        price={product.currentPrice}
        regularPrice={product.originalPrice}
        rating={product.rating}
        reviewCount={product.reviewCount}
        onShare={handleShare}
      />
      <ProductDescription text={product.description} />
    </div>
  );
}`}</pre>
                </div>
              </div>

              {/* ProductCards Component */}
              <div className={styles.showcase__componentShowcase}>
                <div className={styles.showcase__componentHeader}>
                  <h3 className={styles.showcase__componentName}>ProductCards</h3>
                  <span className={styles.showcase__componentPath}>
                    components/molecules/ProductCards
                  </span>
                </div>
                
                <div className={styles.showcase__componentDemo}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* Horizontal Variants */}
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '16px', color: '#666' }}>Horizontal Layout</h4>
                      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {/* In stock horizontal */}
                        <ProductCards
                          name="Classic T-Shirt"
                          price={14.99}
                          regularPrice={19.99}
                          imageUrl="/categories/product-balloon.png"
                          imageAlt="Classic T-Shirt"
                          rating={4.5}
                          reviewCount={280}
                          colorChoices={4}
                          stockCount={27}
                          inStock={true}
                          fulfillments={['Pickup', 'shipping']}
                          variant="horizontal"
                          onAddToCart={() => console.log('Add to cart: Classic T-Shirt')}
                          onProductClick={() => console.log('View product: Classic T-Shirt')}
                        />
                        
                        {/* Out of stock horizontal */}
                        <ProductCards
                          name="Premium Hoodie with Custom Design"
                          price={34.99}
                          regularPrice={49.99}
                          imageUrl="/categories/product-balloon.png"
                          imageAlt="Premium Hoodie"
                          rating={4.2}
                          reviewCount={150}
                          colorChoices={6}
                          inStock={false}
                          fulfillments={['Pickup', 'shipping']}
                          variant="horizontal"
                          onViewDetails={() => console.log('View details: Premium Hoodie')}
                          onProductClick={() => console.log('View product: Premium Hoodie')}
                        />
                      </div>
                    </div>

                    {/* Vertical Variants */}
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '16px', color: '#666' }}>Vertical Layout</h4>
                      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {/* In stock vertical */}
                        <ProductCards
                          name="Graphic Tee"
                          price={18.00}
                          regularPrice={25.00}
                          imageUrl="/categories/product-balloon.png"
                          imageAlt="Graphic Tee"
                          rating={4.8}
                          reviewCount={450}
                          colorChoices={8}
                          stockCount={15}
                          inStock={true}
                          fulfillments={['Pickup', 'shipping']}
                          variant="vertical"
                          onAddToCart={() => console.log('Add to cart: Graphic Tee')}
                          onProductClick={() => console.log('View product: Graphic Tee')}
                        />
                        
                        {/* Out of stock vertical */}
                        <ProductCards
                          name="Limited Edition Jacket"
                          price={89.99}
                          regularPrice={120.00}
                          imageUrl="/categories/product-balloon.png"
                          imageAlt="Limited Edition Jacket"
                          rating={5}
                          reviewCount={75}
                          colorChoices={3}
                          inStock={false}
                          fulfillments={['Pickup', 'shipping']}
                          variant="vertical"
                          onViewDetails={() => console.log('View details: Limited Edition Jacket')}
                          onProductClick={() => console.log('View product: Limited Edition Jacket')}
                        />

                        {/* Minimal props example */}
                        <ProductCards
                          name="Basic Item"
                          price={9.99}
                          imageUrl="/categories/product-balloon.png"
                          variant="vertical"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={styles.showcase__componentCode}>
                  <pre>{`import ProductCards from '@/components/molecules/ProductCards/ProductCards';

// Horizontal layout - In stock
<ProductCards
  name="Classic T-Shirt"
  price={14.99}
  regularPrice={19.99}
  imageUrl="/product-tshirt.jpg"
  imageAlt="Classic T-Shirt"
  rating={4.5}
  reviewCount={280}
  colorChoices={4}
  stockCount={27}
  inStock={true}
  fulfillments={['Pickup', 'shipping']}
  variant="horizontal"
  onAddToCart={() => handleAddToCart('tshirt-001')}
  onProductClick={() => navigateToProduct('tshirt-001')}
/>

// Vertical layout - Out of stock
<ProductCards
  name="Limited Edition Jacket"
  price={89.99}
  regularPrice={120.00}
  imageUrl="/product-jacket.jpg"
  imageAlt="Limited Edition Jacket"
  rating={5}
  reviewCount={75}
  colorChoices={3}
  inStock={false}
  fulfillments={['Pickup', 'shipping']}
  variant="vertical"
  onViewDetails={() => handleViewDetails('jacket-001')}
  onProductClick={() => navigateToProduct('jacket-001')}
/>

// Minimal configuration
<ProductCards
  name="Basic Item"
  price={9.99}
  imageUrl="/product-basic.jpg"
  variant="vertical"
/>

// Usage in product grid
function ProductGrid({ products }) {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCards
          key={product.id}
          name={product.name}
          price={product.salePrice || product.price}
          regularPrice={product.salePrice ? product.price : undefined}
          imageUrl={product.imageUrl}
          imageAlt={product.name}
          rating={product.rating}
          reviewCount={product.reviewCount}
          colorChoices={product.variants?.length}
          stockCount={product.inventory}
          inStock={product.inventory > 0}
          fulfillments={product.fulfillmentOptions}
          variant="vertical"
          onAddToCart={() => addToCart(product.id)}
          onViewDetails={() => viewDetails(product.id)}
          onProductClick={() => navigateToProduct(product.id)}
        />
      ))}
    </div>
  );
}`}</pre>
                </div>
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
              {/* OrderSummary Component */}
              <div className={styles.showcase__componentShowcase}>
                <div className={styles.showcase__componentHeader}>
                  <h3 className={styles.showcase__componentName}>OrderSummary</h3>
                  <span className={styles.showcase__componentPath}>
                    components/organisms/OrderSummary
                  </span>
                </div>
                
                <div className={styles.showcase__componentDemo}>
                  <div style={{ width: '350px', margin: '0 auto' }}>
                    <OrderSummary
                      originalTotal={7.99}
                      rewards={5.00}
                      subtotal={33.48}
                      crvFeeQuantity={3}
                      crvFeePerItem={0.10}
                      bagFeeQuantity={2}
                      bagFeePerItem={0.10}
                      tax={2.34}
                      orderTotal={12.94}
                      onProceedToCheckout={() => console.log('Proceed to checkout')}
                    />
                  </div>
                </div>
                
                <div className={styles.showcase__componentCode}>
                  <pre>{`import OrderSummary from '@/components/organisms/OrderSummary/OrderSummary';

function CheckoutPage() {
  const handleCheckout = () => {
    console.log('Proceeding to checkout...');
  };

  return (
    <OrderSummary
      originalTotal={7.99}
      rewards={5.00}
      subtotal={33.48}
      crvFeeQuantity={3}
      crvFeePerItem={0.10}
      bagFeeQuantity={2}
      bagFeePerItem={0.10}
      tax={2.34}
      orderTotal={12.94}
      onProceedToCheckout={handleCheckout}
    />
  );
}`}</pre>
                </div>
              </div>

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