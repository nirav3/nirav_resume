// ---- Render + interaction logic ----

function hashOf(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  const hex = (h >>> 0).toString(16).padStart(8, "0");
  return hex.slice(0, 7);
}

function el(tag, className, html) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

const activeFilters = new Set();

// Broad families of related tags — selecting one member matches commits/
// skills tagged with any other member (e.g. "AWS EC2" also surfaces "AWS
// Lambda", "S3", "DynamoDB" ... since they're all AWS services).
const SKILL_GROUPS = [
  { key: "aws", pattern: /\b(aws|ec2|ecs|lambda|fargate|emr|glue|kms|s3|redshift|sns|sqs|dynamodb|rds)\b/i },
  { key: "dotnet", pattern: /\.net/i },
  { key: "gcp", pattern: /\b(gcp|gke|google cloud)\b/i },
];

function matchKeysFor(skill) {
  const keys = SKILL_GROUPS.filter((g) => g.pattern.test(skill)).map((g) => g.key);
  return keys.length ? keys : [`solo:${skill.toLowerCase()}`];
}

function toolChip(tool) {
  const chip = el("button", "chip", tool);
  chip.type = "button";
  chip.addEventListener("click", (ev) => {
    ev.stopPropagation();
    toggleFilter(tool);
  });
  return chip;
}

function renderCommit(entry, kind) {
  const hash = hashOf(entry.id + entry.company);
  const row = el("article", "commit");
  row.dataset.matchKeys = [...new Set(entry.tools.flatMap(matchKeysFor))].join("|");
  row.dataset.id = entry.id;

  const graphCol = el("div", "commit-graph");
  graphCol.innerHTML = `<span class="node ${entry.current ? "node-head" : ""}"></span>`;
  row.appendChild(graphCol);

  const body = el("div", "commit-body");

  const head = el("div", "commit-head");
  head.innerHTML = `
    <div class="commit-msg">
      <span class="role">${entry.role}</span>
      <span class="at">@</span>
      <span class="company">${entry.company}</span>
      ${entry.current ? '<span class="badge-head">HEAD</span>' : ""}
    </div>
    <div class="commit-sub">${entry.summary || ""}</div>
  `;
  body.appendChild(head);

  const meta = el("div", "commit-meta");
  meta.innerHTML = `
    <span class="hash">#${hash}</span>
    <span class="dot">&middot;</span>
    <span class="loc">${entry.location}</span>
    <span class="dot">&middot;</span>
    <span class="date">${entry.start}${entry.end ? " – " + entry.end : ""}</span>
  `;
  body.appendChild(meta);

  if (entry.achievements && entry.achievements.length) {
    const details = el("ul", "commit-diff");
    entry.achievements.forEach((a) => {
      const li = el("li", "diff-line");
      li.innerHTML = `<span class="diff-plus">+</span> ${a}`;
      details.appendChild(li);
    });
    body.appendChild(details);
    details.hidden = false;

    if (!entry.current) {
      details.hidden = true;
      head.classList.add("collapsible");
      head.addEventListener("click", () => {
        details.hidden = !details.hidden;
        row.classList.toggle("expanded", !details.hidden);
      });
    } else {
      row.classList.add("expanded");
      head.classList.add("collapsible");
      head.addEventListener("click", () => {
        details.hidden = !details.hidden;
        row.classList.toggle("expanded", !details.hidden);
      });
    }
  }

  if (entry.tools && entry.tools.length) {
    const chips = el("div", "chip-row");
    entry.tools.forEach((t) => chips.appendChild(toolChip(t)));
    body.appendChild(chips);
  }

  row.appendChild(body);
  return row;
}

function renderLog(containerId, entries, kind) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  entries.forEach((entry) => container.appendChild(renderCommit(entry, kind)));
}

function renderSkills() {
  const wrap = document.getElementById("skills-body");
  wrap.innerHTML = "";
  SKILLS.forEach((group) => {
    const block = el("div", "skill-group");
    block.appendChild(el("h4", null, group.category));
    const row = el("div", "chip-row");
    group.items.forEach((t) => row.appendChild(toolChip(t)));
    block.appendChild(row);
    wrap.appendChild(block);
  });
}

const BRANCH_ORDER = ["main", "projects", "tags"];
let skillBranchMap = {};

function buildSkillBranchMap() {
  const map = {};
  const add = (entries, branch) => {
    entries.forEach((entry) => {
      (entry.tools || []).forEach((t) => {
        matchKeysFor(t).forEach((key) => {
          if (!map[key]) map[key] = new Set();
          map[key].add(branch);
        });
      });
    });
  };
  add(EXPERIENCE, "main");
  add(PROJECTS, "projects");
  add(TAGS, "tags");
  return map;
}

function activateBranch(branchKey) {
  const tabs = document.querySelectorAll(".branch-tab");
  const panels = {
    main: document.getElementById("timeline-main"),
    projects: document.getElementById("timeline-projects"),
    tags: document.getElementById("timeline-tags"),
  };
  tabs.forEach((t) => {
    const isActive = t.dataset.branch === branchKey;
    t.classList.toggle("active", isActive);
    t.setAttribute("aria-selected", String(isActive));
  });
  Object.entries(panels).forEach(([key, panel]) => {
    panel.hidden = key !== branchKey;
  });
}

function branchesForFilters() {
  const branches = new Set();
  activeFilters.forEach((tool) => {
    matchKeysFor(tool).forEach((key) => {
      const m = skillBranchMap[key];
      if (m) m.forEach((b) => branches.add(b));
    });
  });
  return branches;
}

function updateBranchNotifications() {
  const activeKey = document.querySelector(".branch-tab.active").dataset.branch;
  const matches = branchesForFilters();
  document.querySelectorAll(".branch-tab").forEach((tab) => {
    const dot = tab.querySelector(".notify-dot");
    const key = tab.dataset.branch;
    dot.hidden = !(activeFilters.size && key !== activeKey && matches.has(key));
  });
}

function renderFilterTags() {
  const wrap = document.getElementById("filter-tags");
  wrap.innerHTML = "";
  activeFilters.forEach((tool) => {
    const pill = el("button", "filter-tag", `${tool} <span class="filter-tag-x">✕</span>`);
    pill.type = "button";
    pill.addEventListener("click", () => toggleFilter(tool));
    wrap.appendChild(pill);
  });
}

function expandForFilter(commitEl) {
  const details = commitEl.querySelector(".commit-diff");
  if (!details || !details.hidden) return;
  details.hidden = false;
  commitEl.classList.add("expanded");
  commitEl.dataset.autoExpanded = "true";
}

function collapseIfAutoExpanded(commitEl) {
  if (commitEl.dataset.autoExpanded !== "true") return;
  const details = commitEl.querySelector(".commit-diff");
  if (details) details.hidden = true;
  commitEl.classList.remove("expanded");
  delete commitEl.dataset.autoExpanded;
}

function applyFilters() {
  const status = document.getElementById("filter-status");

  const needleKeys = new Set();
  activeFilters.forEach((tool) => matchKeysFor(tool).forEach((k) => needleKeys.add(k)));

  document.querySelectorAll(".chip").forEach((c) => {
    const label = c.textContent.trim();
    const isSelected = activeFilters.has(label);
    const isGrouped = !isSelected && matchKeysFor(label).some((k) => needleKeys.has(k));
    c.classList.toggle("chip-active", isSelected);
    c.classList.toggle("chip-grouped", isGrouped);
  });

  if (!activeFilters.size) {
    status.hidden = true;
    document.querySelectorAll(".commit").forEach((c) => {
      c.classList.remove("dim");
      collapseIfAutoExpanded(c);
    });
    updateBranchNotifications();
    return;
  }

  status.hidden = false;
  renderFilterTags();

  const matches = branchesForFilters();
  const activeKey = document.querySelector(".branch-tab.active").dataset.branch;
  if (matches.size && !matches.has(activeKey)) {
    const target = BRANCH_ORDER.find((b) => matches.has(b));
    if (target) activateBranch(target);
  }

  document.querySelectorAll(".commit").forEach((c) => {
    const keys = c.dataset.matchKeys.split("|");
    const has = keys.some((k) => needleKeys.has(k));
    c.classList.toggle("dim", !has);
    if (has) {
      expandForFilter(c);
    } else {
      collapseIfAutoExpanded(c);
    }
  });

  updateBranchNotifications();
}

function toggleFilter(tool) {
  if (activeFilters.has(tool)) {
    activeFilters.delete(tool);
  } else {
    activeFilters.add(tool);
  }
  applyFilters();
}

function clearFilters() {
  activeFilters.clear();
  applyFilters();
}

function initBranchTabs() {
  const tabs = document.querySelectorAll(".branch-tab");
  tabs.forEach((tab) => {
    const dot = el("span", "notify-dot");
    dot.hidden = true;
    dot.title = "This skill also appears on this branch";
    tab.appendChild(dot);
    tab.addEventListener("click", () => {
      activateBranch(tab.dataset.branch);
      updateBranchNotifications();
    });
  });
}

function initTyped() {
  const target = document.getElementById("typed");
  const full = "whoami --role=\"Senior Software Engineer\" --focus=\"backend, cloud, data\"";
  let i = 0;
  const tick = () => {
    if (i <= full.length) {
      target.textContent = full.slice(0, i);
      i++;
      setTimeout(tick, 18);
    }
  };
  tick();
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("count-main").textContent = EXPERIENCE.length;
  document.getElementById("count-projects").textContent = PROJECTS.length;
  document.getElementById("count-tags").textContent = TAGS.length;

  renderLog("timeline-main", EXPERIENCE, "experience");
  renderLog("timeline-projects", PROJECTS, "project");
  renderLog("timeline-tags", TAGS, "tag");
  renderSkills();
  skillBranchMap = buildSkillBranchMap();
  initBranchTabs();
  initTyped();

  document.getElementById("clear-filter").addEventListener("click", clearFilters);
});
