'use client';

import React, { useState } from 'react';
import Button from '@/components/atoms/Button/Button';
import Chip from '@/components/atoms/Chip/Chip';
import Dropdown, { DropdownOption } from '@/components/atoms/Dropdown/Dropdown';
import RadioButtonSelector from '@/components/atoms/RadioButtonSelector/RadioButtonSelector';
import TextField from '@/components/atoms/TextField/TextField';
import CartHeader from '@/components/atoms/CartHeader/CartHeader';
import QuantitySelector from '@/components/molecules/QuantitySelector/QuantitySelector';
import CategoryTile from '@/components/molecules/CategoryTile/CategoryTile';
import OrderStatus, { OrderStatusType } from '@/components/molecules/OrderStatus/OrderStatus';
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
                    
                    {/* Clickable variant */}
                    <div style={{ width: '100%' }}>
                      <CartHeader
                        itemCount={5}
                        totalPrice={125.99}
                        onClick={() => console.log('Cart clicked')}
                        ariaLabel="Open shopping cart"
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

// Clickable variant
<CartHeader
  itemCount={5}
  totalPrice={125.99}
  onClick={() => openCartDrawer()}
  ariaLabel="Open shopping cart"
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
        onClick={() => router.push('/cart')}
      />
    </header>
  );
};`}</pre>
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