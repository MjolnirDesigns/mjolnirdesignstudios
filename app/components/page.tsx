"use client";

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import { FloatingNav } from '@/components/ui/FloatingNav';
import Footer from '@/components/Footer';
import { navItems } from '@/data';

// Simple cn utility for conditional classNames
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}

const components = [
  { id: 'animations', name: 'Animations', content: <AnimationsSection /> },
  { id: 'avatar', name: 'Avatar', content: <AvatarSection /> },
  { id: 'buttons', name: 'Buttons', content: <ButtonsSection /> },
  { id: 'calendars', name: 'Calendars', content: <CalendarsSection /> },
  { id: 'cards', name: 'Cards', content: <CardsSection /> },
  { id: 'forms', name: 'Forms', content: <FormsSection /> },
  { id: 'icons', name: 'Icons', content: <IconsSection /> },
  { id: 'logos', name: 'Logos', content: <LogosSection /> },
  { id: 'navbar', name: 'Navbar', content: <NavbarSection /> },
  { id: 'progress', name: 'Progress', content: <ProgressSection /> },
].sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically


function ProgressSection() {
  return (    
  <section id="progress" className="mb-16">
    <h2 className="text-4xl font-bold text-gold mb-4">Progress</h2>
    <p className="text-gray-300">Coming soon... A progress bar component to track your journey through the realms.</p>
  </section>
  );
}



function NavbarSection() {
  return (
    <section id="navbar" className="mb-16">
      <h2 className="text-4xl font-bold text-gold mb-4">Navbar</h2>
      <p className="text-gray-300">Coming soon... A responsive navbar component inspired by Norse mythology.</p>
    </section>
  );
}


function LogosSection() {
  return (
    <section id="logos" className="mb-16">
      <h2 className="text-4xl font-bold text-gold mb-4">Logos</h2>
      <p className="text-gray-300">Coming soon... A collection of Norse-inspired logos for your brand.</p>
    </section>
  );
}


function IconsSection() {
  return (
    <section id="icons" className="mb-16">
      <h2 className="text-4xl font-bold text-gold mb-4">Icons</h2>
      <p className="text-gray-300">Coming soon... A collection of Norse-inspired icons for your UI.</p>
    </section>
  );
}


function FormsSection() {
  return (
    <section id="forms" className="mb-16">
      <h2 className="text-4xl font-bold text-gold mb-4">Forms</h2>
      <p className="text-gray-300">Coming soon... Powerful forms to capture the essence of your users.</p>
    </section>
  );
}


function CardsSection() {
  return (
    <section id="cards" className="mb-16">
      <h2 className="text-4xl font-bold text-gold mb-4">Cards</h2>
      <p className="text-gray-300">Coming soon... Display your content in legendary cards fit for the halls of Valhalla.</p>
    </section>
  );
}


function CalendarsSection() {
  return (
    <section id="calendars" className="mb-16">
      <h2 className="text-4xl font-bold text-gold mb-4">Calendars</h2>
      <p className="text-gray-300">Coming soon... Track time like the gods of Asgard.</p>
    </section>
  );
}


function ButtonsSection() {
  return (
    <section id="buttons" className="mb-16">
      <h2 className="text-4xl font-bold text-gold mb-4">Buttons</h2>
      <p className="text-gray-300">Coming soon... Interactive buttons worthy of Odin&apos;s throne.</p>
    </section>
  );
}




function AnimationsSection() {
  return (
    <section id="animations" className="mb-16">
      <h2 className="text-4xl font-bold text-gold mb-4">Animations</h2>
      <p className="text-gray-300">Coming soon... Powerful transitions forged in the fires of Muspelheim.</p>
    </section>
  );
}

function AvatarSection() {
  return (
    <section id="avatar" className="mb-16">
      <h2 className="text-4xl font-bold text-gold mb-4">Avatar</h2>
      <p className="text-lg text-gray-300 mb-6">
        The Avatar component represents a user or entity in the Asgardian realm, displaying a profile rune (image), initials etched in ancient script, or a fallback mythical icon like Thor&apos;s hammer.
      </p>
      <h3 className="text-2xl font-semibold text-silver mb-2">Installation</h3>
      <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto mb-6">
        <code className="text-orange">{`npm install @mjolnirui/avatar`}</code>
      </pre>
      <p className="text-gray-400 mb-6">The above command is for individual installation only. You may skip this step if `@mjolnirui/react` is already installed globally.</p>
      <h3 className="text-2xl font-semibold text-silver mb-2">Import</h3>
      <p className="text-gray-300 mb-2">MjolnirUI exports 3 avatar-related components:</p>
      <ul className="list-disc pl-6 text-gray-300 mb-6">
        <li><strong>Avatar</strong>: The main component to display an avatar.</li>
        <li><strong>AvatarGroup</strong>: A wrapper component to display a group of avatars, like a council of gods.</li>
        <li><strong>AvatarIcon</strong>: The default icon used as fallback when the image fails to load, inspired by Norse symbols.</li>
      </ul>
      <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto mb-6">
        <code className="text-orange">{`import { Avatar, AvatarGroup, AvatarIcon } from "@mjolnirui/react";`}</code>
      </pre>
      <h3 className="text-2xl font-semibold text-silver mb-2">Usage</h3>
      <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto mb-6">
        <code className="text-orange">{`<Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />`}</code>
      </pre>
      <h4 className="text-xl font-semibold text-silver mb-2">Avatar Fallbacks</h4>
      <p className="text-gray-300 mb-6">If there is an error loading the `src` of the avatar, there are 2 fallbacks: If there&apos;s a `name` prop, we use it to generate the initials and a random, accessible background color inspired by Norse elements. If there&apos;s no `name` prop, we use a default mythical avatar. If the `showFallback` is not passed, the fallbacks will not be displayed.</p>
      <h4 className="text-xl font-semibold text-silver mb-2">Custom Fallback</h4>
      <p className="text-gray-300 mb-6">You can also provide a custom fallback component to be displayed when the `src` fails to load, such as a Norse rune or hammer icon.</p>
      <h4 className="text-xl font-semibold text-silver mb-2">Custom Implementation</h4>
      <p className="text-gray-300 mb-6">In case you need to customize the avatar even further, you can use the `useAvatar` hook to create your own implementation, infusing it with Asgardian flair.</p>
      <h4 className="text-xl font-semibold text-silver mb-2">Custom Initials Logic</h4>
      <p className="text-gray-300 mb-6">It is possible to customize the logic used to generate the initials by passing a function to the `getInitials` prop. By default, we merge the first characters of each word in the `name` prop, styled like ancient runes.</p>
      <h4 className="text-xl font-semibold text-silver mb-2">Avatar Group</h4>
      <p className="text-gray-300 mb-6">Use AvatarGroup to assemble multiple avatars, evoking a gathering of the Aesir.</p>
      <h4 className="text-xl font-semibold text-silver mb-2">Group Max Count</h4>
      <p className="text-gray-300 mb-6">You can limit the number of avatars displayed by passing the `max` prop to the `AvatarGroup` component.</p>
      <h4 className="text-xl font-semibold text-silver mb-2">Group Total Count</h4>
      <p className="text-gray-300 mb-6">You can display the total number of avatars by passing the `total` prop to the `AvatarGroup` component.</p>
      <h4 className="text-xl font-semibold text-silver mb-2">Group Custom Count</h4>
      <p className="text-gray-300 mb-6">`AvatarGroup` provides a `renderCount` prop to customize the count displayed when the `total` prop is passed.</p>
      <h4 className="text-xl font-semibold text-silver mb-2">Group Grid</h4>
      <p className="text-gray-300 mb-6">By passing the `isGrid` prop to the `AvatarGroup` component, the avatars will be displayed in a grid layout, like stars in the Norse sky.</p>
      <h4 className="text-xl font-semibold text-silver mb-2">Group Custom Implementation</h4>
      <p className="text-gray-300 mb-6">In case you need to customize the avatar group even further, you can use the `useAvatarGroup` hook and the `AvatarGroupProvider` to create your own implementation.</p>
      <h4 className="text-xl font-semibold text-silver mb-2">Slots</h4>
      <p className="text-gray-300 mb-2">Avatar has the following slots:</p>
      <ul className="list-disc pl-6 text-gray-300 mb-6">
        <li><strong>base</strong>: Avatar wrapper, it includes styles for focus ring, position, and general appearance.</li>
        <li><strong>img</strong>: Image element within the avatar, it includes styles for opacity transition and size.</li>
        <li><strong>fallback</strong>: Fallback content when the image fails to load or is not provided, it includes styles for centering the content.</li>
        <li><strong>name</strong>: Initials displayed when the image is not provided or fails to load, it includes styles for font, text alignment, and inheritance.</li>
        <li><strong>icon</strong>: Icon element within the avatar, it includes styles for centering the content, text inheritance, and size.</li>
      </ul>
      <h4 className="text-xl font-semibold text-silver mb-2">Custom Avatar Styles</h4>
      <p className="text-gray-300 mb-6">You can customize any part of the avatar by using the `classNames` prop, each `slot` has its own `className`.</p>
      <h4 className="text-xl font-semibold text-silver mb-2">Data Attributes</h4>
      <p className="text-gray-300 mb-6">`Avatar` has the following attributes on the `base` element: data-hover (when hovered), data-focus (when focused), data-focus-visible (when focused with keyboard).</p>
      <h3 className="text-2xl font-semibold text-silver mb-2">API</h3>
      <h4 className="text-xl font-semibold text-silver mb-2">Avatar Props</h4>
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="bg-black/50">
            <th className="border border-white/10 p-2 text-left">Prop</th>
            <th className="border border-white/10 p-2 text-left">Type</th>
            <th className="border border-white/10 p-2 text-left">Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-white/10 p-2">src</td>
            <td className="border border-white/10 p-2">string</td>
            <td className="border border-white/10 p-2"></td>
          </tr>
          <tr>
            <td className="border border-white/10 p-2">color</td>
            <td className="border border-white/10 p-2">default | primary | secondary | success | warning | danger</td>
            <td className="border border-white/10 p-2">&quot;default&quot;</td>
          </tr>
          <tr>
            <td className="border border-white/10 p-2">radius</td>
            <td className="border border-white/10 p-2">none | sm | md | lg | full</td>
            <td className="border border-white/10 p-2">&quot;full&quot;</td>
          </tr>
          <tr>
            <td className="border border-white/10 p-2">size</td>
            <td className="border border-white/10 p-2">sm | md | lg</td>
            <td className="border border-white/10 p-2">&quot;md&quot;</td>
          </tr>
          <tr>
            <td className="border border-white/10 p-2">name</td>
            <td className="border border-white/10 p-2">string</td>
            <td className="border border-white/10 p-2"></td>
          </tr>
          <tr>
            <td className="border border-white/10 p-2">icon</td>
            <td className="border border-white/10 p-2">ReactNode</td>
            <td className="border border-white/10 p-2"></td>
          </tr>
          <tr>
            <td className="border border-white/10 p-2">fallback</td>
            <td className="border border-white/10 p-2">ReactNode</td>
            <td className="border border-white/10 p-2"></td>
          </tr>
          <tr>
            <td className="border border-white/10 p-2">isBordered</td>
            <td className="border border-white/10 p-2">boolean</td>
            <td className="border border-white/10 p-2">false</td>
          </tr>
          <tr>
            <td className="border border-white/10 p-2">isDisabled</td>
            <td className="border border-white/10 p-2">boolean</td>
            <td className="border border-white/10 p-2">false</td>
          </tr>
          <tr>
            <td className="border border-white/10 p-2">isFocusable</td>
            <td className="border border-white/10 p-2">boolean</td>
            <td className="border border-white/10 p-2">false</td>
          </tr>
          <tr>
            <td className="border border-white/10 p-2">showFallback</td>
            <td className="border border-white/10 p-2">boolean</td>
            <td className="border border-white/10 p-2">false</td>
          </tr>
          <tr>
            <td className="border border-white/10 p-2">ImgComponent</td>
            <td className="border border-white/10 p-2">React.ElementType</td>
            <td className="border border-white/10 p-2">&quot;img&quot;</td>
          </tr>
          <tr>
            <td className="border border-white/10 p-2">imgProps</td>
            <td className="border border-white/10 p-2">ImgComponentProps</td>
            <td className="border border-white/10 p-2"></td>
          </tr>
          <tr>
            <td className="border border-white/10 p-2">classNames</td>
            <td className="border border-white/10 p-2">Partial&lt;Record&lt;&quot;base&quot; | &quot;img&quot; | &quot;fallback&quot; | &quot;name&quot; | &quot;icon&quot;, string&gt;&gt;</td>
            <td className="border border-white/10 p-2"></td>
          </tr>
        </tbody>
      </table>
      <p className="text-gray-400 mb-6">Note: Colors are adapted to Mjolnir theme (e.g., gold for success, orange for warning, silver for secondary).</p>
      <h4 className="text-xl font-semibold text-silver mb-2">Avatar Group Props</h4>
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="bg-black/50">
            <th className="border border-white/10 p-2 text-left">Prop</th>
            <th className="border border-white/10 p-2 text-left">Type</th>
            <th className="border border-white/10 p-2 text-left">Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-white/10 p-2">max</td>
            <td className="border border-white/10 p-2">number</td>
            <td className="border border-white/10 p-2">&quot;5&quot;</td>
          </tr>
          <tr>
            <td className="border border-white/10 p-2">total</td>
            <td className="border border-white/10 p-2">number</td>
            <td className="border border-white/10 p-2"></td>
          </tr>
          <tr>
            <td className="border border-white/10 p-2">size</td>
            <td className="border border-white/10 p-2">AvatarProps[&apos;size&apos;]</td>
            <td className="border border-white/10 p-2"></td>
          </tr>
          <tr>
            <td className="border border-white/10 p-2">color</td>
            <td className="border border-white/10 p-2">AvatarProps[&apos;color&apos;]</td>
            <td className="border border-white/10 p-2"></td>
          </tr>
          <tr>
            <td className="border border-white/10 p-2">radius</td>
            <td className="border border-white/10 p-2">AvatarProps[&apos;radius&apos;]</td>
            <td className="border border-white/10 p-2"></td>
          </tr>
          <tr>
            <td className="border border-white/10 p-2">isGrid</td>
            <td className="border border-white/10 p-2">boolean</td>
            <td className="border border-white/10 p-2">false</td>
          </tr>
          <tr>
            <td className="border border-white/10 p-2">isDisabled</td>
            <td className="border border-white/10 p-2">boolean</td>
            <td className="border border-white/10 p-2"></td>
          </tr>
          <tr>
            <td className="border border-white/10 p-2">isBordered</td>
            <td className="border border-white/10 p-2">boolean</td>
            <td className="border border-white/10 p-2"></td>
          </tr>
          <tr>
            <td className="border border-white/10 p-2">renderCount</td>
            <td className="border border-white/10 p-2">(count: number) =&gt; ReactNode</td>
            <td className="border border-white/10 p-2"></td>
          </tr>
          <tr>
            <td className="border border-white/10 p-2">classNames</td>
            <td className="border border-white/10 p-2">Partial&lt;Record&lt;&quot;base&quot; | &quot;count&quot;, string&gt;&gt;</td>
            <td className="border border-white/10 p-2"></td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

const ComponentsPage = () => {
  const [activeComponent, setActiveComponent] = useState('avatar'); // Default to Avatar

  return (
    <div className="min-h-screen flex flex-col bg-shadow text-silver-100 overflow-hidden">
      <FloatingNav navItems={navItems} />
      <Navbar />
      <main className="flex-1 flex mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] pt-24 md:pt-28">
          {/* Sidebar */}
          <aside className="lg:w-64 lg:pr-8 mb-8 lg:mb-0 sticky top-24 self-start">
            <h2 className="text-3xl font-bold text-gold mb-4">Components</h2>
            <ul className="space-y-2">
              {components.map((comp) => (
                <li key={comp.id}>
                  <button
                    onClick={() => setActiveComponent(comp.id)}
                    className={cn(
                      'text-left w-full py-2 px-4 rounded-md transition',
                      activeComponent === comp.id ? 'bg-gold/20 text-gold' : 'text-gray-300 hover:text-gold hover:bg-gold/10'
                    )}
                  >
                    {comp.name}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
          {/* Main Content Pane */}
          <div className="flex-1 overflow-y-auto">
            {components.find((comp) => comp.id === activeComponent)?.content}
          </div>
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
};

export default ComponentsPage;