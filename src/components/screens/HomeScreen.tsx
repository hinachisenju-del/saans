// src/components/screens/HomeScreen.tsx
import React, { useState } from 'react';
import type { HouseholdProfile, Room } from '../../types/household';
import { calculateIndoorPm25 } from '../../engines/massBalanceEngine';
import {
  Home as HomeIcon,
  Power,
  Wind,
  Sparkles,
} from 'lucide-react';

interface HomeScreenProps {
  household: HouseholdProfile;
  outdoorPm25: number;
  language: 'en' | 'hi';
  onUpdateRooms: (rooms: Room[]) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  household,
  outdoorPm25,
  language,
  onUpdateRooms,
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>('r_kids');

  const selectedRoom =
    household.rooms.find((r) => r.id === selectedRoomId) || household.rooms[0];

  const simResult = calculateIndoorPm25({
    room: selectedRoom,
    outdoorPm25,
    filterAgeDays: 45,
  });

  const handleToggleWindow = (roomId: string) => {
    const updated = household.rooms.map((r) => {
      if (r.id === roomId) {
        return { ...r, windowOpen: !r.windowOpen };
      }
      return r;
    });
    onUpdateRooms(updated);
  };

  const handleToggleSeal = (roomId: string) => {
    const updated = household.rooms.map((r) => {
      if (r.id === roomId) {
        return { ...r, isSealed: !r.isSealed };
      }
      return r;
    });
    onUpdateRooms(updated);
  };

  const handlePurifierPower = (roomId: string, power: Room['purifierPower']) => {
    const updated = household.rooms.map((r) => {
      if (r.id === roomId) {
        return {
          ...r,
          hasPurifier: power !== 'off',
          purifierPower: power,
        };
      }
      return r;
    });
    onUpdateRooms(updated);
  };

  return (
    <div className="space-y-5 pb-24 animate-fade-in">
      {/* Overview Card */}
      <div className="bg-paper-100 dark:bg-paper-dark100 rounded-3xl p-4 border border-paper-300 dark:border-paper-darkBorder shadow-paper dark:shadow-dark-paper transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HomeIcon className="w-5 h-5 text-teal-brand dark:text-teal-darkBrand" />
            <h2 className="text-base font-bold text-ink-deep dark:text-ink-darkDeep">
              {language === 'en' ? 'Indoor Air Simulator' : 'घरेलू वायु गुणवत्ता मॉडल'}
            </h2>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-paper-200 dark:bg-paper-dark200 text-ink-muted dark:text-ink-darkMuted border border-paper-300 dark:border-paper-dark300">
            Outdoor: {outdoorPm25} µg/m³
          </span>
        </div>
        <p className="text-xs text-ink-muted dark:text-ink-darkMuted mt-1 leading-relaxed">
          {language === 'en'
            ? 'Interactive single-zone mass balance model. Tap any room on the floor plan to view its live air tint and toggle sealing, ventilation, or purifiers.'
            : 'कमरे के नक्शे पर टैप करके खिड़की, सीलिंग और प्यूरीफायर चालू करके हवा पर सीधा असर देखें।'}
        </p>
      </div>

      {/* Drawn 2D Floor Plan with Physics-Driven Room Tint & Concentric Clean Air Waves */}
      <div className="bg-paper-100 dark:bg-paper-dark100 rounded-3xl p-4 border border-paper-300 dark:border-paper-darkBorder shadow-paper dark:shadow-dark-paper transition-all">
        <div className="flex justify-between items-center text-xs font-bold text-ink-quiet dark:text-ink-darkQuiet mb-2.5">
          <span>{language === 'en' ? 'Apartment Floor Plan (2BHK)' : 'घर का 2D नक्शा'}</span>
          <span className="text-[11px] font-normal italic flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-teal-brand" />
            <span>Interactive Clean Air Ripples</span>
          </span>
        </div>

        {/* 2D Floor Plan Grid */}
        <div className="grid grid-cols-2 gap-3.5 aspect-[4/3] bg-paper-200/50 dark:bg-paper-dark300/40 p-3.5 rounded-2xl border border-paper-300 dark:border-paper-darkBorder relative">
          {household.rooms.map((room) => {
            const isSelected = room.id === selectedRoomId;
            const roomSim = calculateIndoorPm25({
              room,
              outdoorPm25,
              filterAgeDays: 45,
            });

            const isClean = roomSim.steadyStatePm25 < 60;
            const hazeColor = isClean ? '#1B4947' : '#9E5B32';

            return (
              <button
                key={room.id}
                onClick={() => setSelectedRoomId(room.id)}
                className={`rounded-2xl p-3 text-left relative transition-all duration-300 flex flex-col justify-between border-2 overflow-hidden ${
                  isSelected
                    ? 'border-teal-brand dark:border-teal-darkBrand ring-2 ring-teal-brand/30 shadow-md scale-[1.02] z-10'
                    : 'border-paper-300 dark:border-paper-darkBorder hover:border-ink-quiet dark:hover:border-paper-dark400 bg-paper-50 dark:bg-paper-dark200'
                }`}
              >
                {/* Physical Room Tint Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-700 ease-in-out"
                  style={{
                    backgroundColor: hazeColor,
                    opacity: roomSim.tintOpacity * 0.45,
                  }}
                />

                {/* Concentric Clean Air Wave Pulsing if Purifier is Running */}
                {room.hasPurifier && room.purifierPower !== 'off' && (
                  <div className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center pointer-events-none">
                    <span className="absolute w-5 h-5 rounded-full bg-teal-brand/40 purifier-wave" />
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-brand shadow-glow-teal animate-pulse" />
                  </div>
                )}

                {/* Open Window Wind Flow Indicator */}
                {room.windowOpen && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] font-bold text-amber-600 dark:text-amber-400 animate-pulse">
                    <Wind className="w-3.5 h-3.5 animate-bounce" />
                    <span>Inflow</span>
                  </div>
                )}

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-ink-deep dark:text-ink-darkDeep truncate">
                      {room.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-ink-quiet dark:text-ink-darkQuiet">
                    {room.areaM2} m² • {room.windowsCount} window{room.windowsCount > 1 ? 's' : ''}
                  </span>
                </div>

                <div className="relative z-10 mt-3 pt-2 border-t border-ink-deep/10 dark:border-white/10 flex items-baseline justify-between">
                  <div>
                    <span className="text-lg font-black tabular-nums text-ink-deep dark:text-ink-darkDeep leading-none">
                      {roomSim.steadyStatePm25}
                    </span>
                    <span className="text-[10px] text-ink-quiet dark:text-ink-darkQuiet ml-1">µg/m³</span>
                  </div>

                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full transition-all ${
                      isClean
                        ? 'bg-teal-light dark:bg-teal-darkLight text-teal-brand dark:text-teal-darkBrand shadow-sm'
                        : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300'
                    }`}
                  >
                    {roomSim.protectionPercentage}% cleaner
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Room Controls Drawer with Tactile Micro-Interactions */}
      <div className="bg-paper-100 dark:bg-paper-dark100 rounded-3xl p-5 border border-paper-300 dark:border-paper-darkBorder shadow-paper dark:shadow-dark-paper space-y-4 transition-all">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-bold text-ink-deep dark:text-ink-darkDeep">
              {selectedRoom.name}
            </h3>
            <p className="text-xs text-ink-muted dark:text-ink-darkMuted mt-0.5">
              Simulated: <strong className="text-ink-deep dark:text-ink-darkDeep font-bold">{simResult.steadyStatePm25} µg/m³</strong> ({simResult.protectionPercentage}% lower than outdoors)
            </p>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-semibold text-ink-quiet dark:text-ink-darkQuiet block">
              Air Exchange
            </span>
            <span className="text-xs font-extrabold text-ink-deep dark:text-ink-darkDeep tabular-nums">
              {simResult.achAirExchange} ACH
            </span>
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-paper-200 dark:border-paper-dark300">
          <button
            onClick={() => handleToggleWindow(selectedRoom.id)}
            className={`p-3.5 rounded-2xl border text-left transition-all active:scale-95 ${
              selectedRoom.windowOpen
                ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 shadow-sm'
                : 'bg-paper-50 dark:bg-paper-dark200 border-paper-300 dark:border-paper-darkBorder text-ink-deep dark:text-ink-darkDeep hover:border-ink-quiet'
            }`}
          >
            <span className="text-xs font-bold block mb-0.5">
              Window: {selectedRoom.windowOpen ? 'Open 🪟' : 'Closed 🔒'}
            </span>
            <span className="text-[10px] text-ink-quiet dark:text-ink-darkQuiet block leading-snug">
              {selectedRoom.windowOpen
                ? 'High smog inflow (4.2 ACH)'
                : 'Sealed baseline (0.6 ACH)'}
            </span>
          </button>

          <button
            onClick={() => handleToggleSeal(selectedRoom.id)}
            className={`p-3.5 rounded-2xl border text-left transition-all active:scale-95 ${
              selectedRoom.isSealed
                ? 'bg-teal-light dark:bg-teal-darkLight border-teal-brand dark:border-teal-darkBrand text-teal-dark dark:text-teal-darkBrand shadow-sm'
                : 'bg-paper-50 dark:bg-paper-dark200 border-paper-300 dark:border-paper-darkBorder text-ink-deep dark:text-ink-darkDeep hover:border-ink-quiet'
            }`}
          >
            <span className="text-xs font-bold block mb-0.5">
              Draft Strips: {selectedRoom.isSealed ? 'Sealed 🛡️' : 'Unsealed ⚠️'}
            </span>
            <span className="text-[10px] text-ink-quiet dark:text-ink-darkQuiet block leading-snug">
              {selectedRoom.isSealed
                ? 'Drafts blocked (0.28 ACH)'
                : 'Leaky gaps leak outdoor air'}
            </span>
          </button>
        </div>

        {/* Purifier CADR Level Selector with Glowing Active Pill */}
        <div className="pt-2 border-t border-paper-200 dark:border-paper-dark300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-ink-deep dark:text-ink-darkDeep flex items-center gap-1.5">
              <Power className="w-3.5 h-3.5 text-teal-brand dark:text-teal-darkBrand" />
              <span>HEPA Purifier Speed</span>
            </span>
            <span className="text-[11px] text-teal-brand dark:text-teal-darkBrand font-bold tabular-nums">
              {simResult.achPurifier} Purifier ACH
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 bg-paper-200 dark:bg-paper-dark300 p-1.5 rounded-2xl">
            {(['off', 'low', 'med', 'high'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => handlePurifierPower(selectedRoom.id, lvl)}
                className={`py-2 text-xs font-bold rounded-xl uppercase tracking-wider transition-all duration-200 ${
                  selectedRoom.purifierPower === lvl
                    ? 'bg-paper-50 dark:bg-paper-dark100 text-teal-brand dark:text-teal-darkBrand shadow-md scale-105 font-black'
                    : 'text-ink-quiet dark:text-ink-darkQuiet hover:text-ink-deep dark:hover:text-ink-darkDeep active:scale-95'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Clean One Room Well Strategy */}
        <div className="p-3.5 bg-teal-light/40 dark:bg-teal-darkLight/30 border border-teal-brand/30 dark:border-teal-darkBrand/30 rounded-2xl text-xs text-ink-deep dark:text-ink-darkDeep">
          <span className="font-bold text-teal-brand dark:text-teal-darkBrand block mb-0.5">
            💡 Strategy: "Clean One Room Well"
          </span>
          <p className="text-[11px] leading-relaxed text-ink-muted dark:text-ink-darkMuted">
            Rather than spreading one purifier across the entire house, keep the bedroom door shut with draft stoppers at the door base. Running it on High for 30 minutes lowers PM2.5 to under 45 µg/m³.
          </p>
        </div>
      </div>
    </div>
  );
};
