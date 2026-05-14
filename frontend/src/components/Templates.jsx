import { useMemo, useState } from 'react';
import { NDA_TEMPLATES } from '../data/ndaTemplates';
import { useResponsive } from '../hooks/useResponsive';

const getLevelColors = (level) =>
  level === 'Advanced'
    ? { bg: '#fff7ed', color: '#c2410c', border: '#fdba74' }
    : { bg: '#ecfdf5', color: '#15803d', border: '#86efac' };

export const Templates = ({ onSelectTemplate }) => {
  const [search, setSearch] = useState('');
  const { isMobile, isTablet } = useResponsive();

  const filteredTemplates = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return NDA_TEMPLATES;

    return NDA_TEMPLATES.filter((template) =>
      [template.label, template.category, template.desc, template.bestFor, ...template.clauses]
        .join(' ')
        .toLowerCase()
        .includes(term),
    );
  }, [search]);

  const standardCount = NDA_TEMPLATES.filter((template) => template.level === 'Standard').length;
  const advancedCount = NDA_TEMPLATES.length - standardCount;

  return (
    <div
      style={{
        padding: '28px',
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top left, rgba(37,99,235,0.08), transparent 24%), linear-gradient(180deg, #f8fbff 0%, #eef4fb 100%)',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 48%, #38bdf8 100%)',
          color: 'white',
          borderRadius: '24px',
          padding: '28px',
          boxShadow: '0 20px 45px rgba(15, 23, 42, 0.16)',
          marginBottom: '22px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            right: '-80px',
            top: '-90px',
            background: 'rgba(255,255,255,0.12)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            right: '80px',
            bottom: '-100px',
            background: 'rgba(255,255,255,0.08)',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: '20px', alignItems: 'end' }}>
          <div>
            <div style={{ fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase', opacity: 0.78, marginBottom: '10px' }}>
              Template Studio
            </div>
            <div style={{ fontSize: '30px', fontWeight: '800', lineHeight: '1.12', maxWidth: '720px', marginBottom: '10px' }}>
              Choose an NDA format that actually matches the relationship you are protecting.
            </div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.84)', maxWidth: '700px', lineHeight: '1.7' }}>
              Every card below now maps to its own agreement structure. When you pick a template, the generated NDA uses clauses tailored to that exact type instead of reusing one generic document.
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr',
              gap: '12px',
              alignSelf: 'stretch',
            }}
          >
            {[
              { value: NDA_TEMPLATES.length, label: 'Template types' },
              { value: standardCount, label: 'Standard' },
              { value: advancedCount, label: 'Advanced' },
              { value: 'Custom', label: 'Clause focus' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: 'rgba(255,255,255,0.14)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: '18px',
                  padding: '16px',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div style={{ fontSize: '22px', fontWeight: '800', marginBottom: '6px' }}>{item.value}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.78)' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '14px',
          alignItems: 'center',
          marginBottom: '18px',
          flexWrap: 'wrap',
        }}
      >
        <input
          type="text"
          placeholder="Search by type, relationship, or clause..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: '280px',
            padding: '13px 16px',
            border: '1px solid #d9e2ef',
            borderRadius: '14px',
            fontSize: '14px',
            boxSizing: 'border-box',
            outline: 'none',
            background: 'rgba(255,255,255,0.94)',
            boxShadow: '0 8px 22px rgba(148, 163, 184, 0.12)',
          }}
        />
        <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>
          {filteredTemplates.length} template{filteredTemplates.length === 1 ? '' : 's'} shown
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${isTablet ? 260 : 300}px, 1fr))`, gap: '18px' }}>
        {filteredTemplates.map((template) => {
          const levelColors = getLevelColors(template.level);
          return (
            <div
              key={template.label}
              style={{
                background: 'rgba(255,255,255,0.96)',
                borderRadius: '22px',
                border: `1px solid ${template.colors.border}`,
                boxShadow: '0 16px 35px rgba(15, 23, 42, 0.08)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  padding: '22px 22px 18px',
                  background: `linear-gradient(135deg, ${template.colors.soft} 0%, white 78%)`,
                  borderBottom: '1px solid rgba(148, 163, 184, 0.16)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '18px',
                      background: template.colors.accent,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '15px',
                      fontWeight: '800',
                      letterSpacing: '0.8px',
                      boxShadow: '0 12px 25px rgba(37, 99, 235, 0.16)',
                    }}
                  >
                    {template.shortLabel}
                  </div>
                  <div
                    style={{
                      padding: '5px 10px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: '700',
                      border: `1px solid ${levelColors.border}`,
                      background: levelColors.bg,
                      color: levelColors.color,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {template.level}
                  </div>
                </div>

                <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: template.colors.ink, fontWeight: '700', marginBottom: '8px' }}>
                  {template.category}
                </div>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', lineHeight: '1.2', marginBottom: '8px' }}>
                  {template.label}
                </div>
                <div style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.6', marginBottom: '12px' }}>
                  {template.desc}
                </div>
                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: '14px',
                    background: 'rgba(255,255,255,0.72)',
                    border: '1px solid rgba(148, 163, 184, 0.18)',
                    color: '#0f172a',
                    fontSize: '13px',
                    fontWeight: '600',
                    lineHeight: '1.5',
                  }}
                >
                  {template.highlight}
                </div>
              </div>

              <div style={{ padding: '18px 22px 22px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Best for
                  </div>
                  <div style={{ fontSize: '13px', color: '#334155', lineHeight: '1.6' }}>{template.bestFor}</div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Clause focus
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {template.clauses.map((clause) => (
                      <span
                        key={clause}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '999px',
                          fontSize: '11.5px',
                          fontWeight: '700',
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          color: '#475569',
                        }}
                      >
                        {clause}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectTemplate && onSelectTemplate(template.label)}
                  style={{
                    marginTop: 'auto',
                    padding: '13px 14px',
                    borderRadius: '14px',
                    border: 'none',
                    background: `linear-gradient(135deg, ${template.colors.accent}, ${template.colors.ink})`,
                    color: 'white',
                    fontSize: '13px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    boxShadow: '0 14px 24px rgba(37, 99, 235, 0.18)',
                  }}
                >
                  Use {template.label}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div
          style={{
            marginTop: '22px',
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '18px',
            padding: '30px',
            textAlign: 'center',
            color: '#64748b',
          }}
        >
          No template matched that search. Try a type name like `Investor`, `Employee`, or `Non-Use`.
        </div>
      )}
    </div>
  );
};
