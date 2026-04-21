"""Generate a PDF mapping EndoRobotics-related peer-reviewed publications to their DOIs.

Inclusion criteria:
  - Peer-reviewed journal publication (full articles, case reports, E-videos,
    and conference abstracts in indexed journal supplements).
  - Explicit reference to EndoRobotics Co., Ltd. devices
    (ROSE / RoSE Platform, ROBOPERA, ROBOPERA-TraCloser, EndoRobotics Alligator)
    OR co-authored by Daehie Hong (Korea Univ. Dept. of Mechanical Engineering,
    the EndoRobotics platform inventor) as precursor/sister research.

Excluded:
  - Regulatory filings (FDA 510(k) etc.).
  - Papers about other robotic platforms from different companies
    (e.g., PETH/K-FLEX by KAIST, FASTER by Shandong Univ.).

Saves the PDF to the user's Downloads folder.
"""
from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, KeepTogether
)
from reportlab.lib.enums import TA_LEFT

PAPERS = [
    # =========================================================
    # Clinical / Direct-use publications (explicit EndoRobotics device)
    # =========================================================
    {
        "section": "Clinical Studies & Case Reports (Direct Use of EndoRobotics Devices)",
        "title": "Robotic-assisted esophageal endoscopic submucosal dissection in a compact and extensive early Barrett's cancer lesion",
        "authors": "Tvaradze G, Tanabe M, Yamamoto K, Groth S, Maggio EM, Inoue H, Seewald S",
        "device": "EndoRobotics Alligator (ROBOPERA & TraCloser)",
        "journal": "Endoscopy",
        "year": "2026",
        "type": "Case Report (E-video, Vol 58, S 01: E323-E324)",
        "notes": "First esophageal ESD application. 11 cm Barrett's adenocarcinoma, R0 en bloc resection via four-axis multidirectional traction.",
        "doi": "10.1055/a-2802-4223",
        "url": "https://doi.org/10.1055/a-2802-4223",
    },
    {
        "section": "Clinical Studies & Case Reports (Direct Use of EndoRobotics Devices)",
        "title": "A novel robotic arm–assisted endoscopic submucosal dissection platform with augmented traction for gastric neoplasms: a first-in-human prospective pilot study (with videos)",
        "authors": "Jeon HJ, Choi HS, Kim S, Lee JM, Kim ES, Keum B, Jeen YT, Chun HJ, Lee B (and colleagues)",
        "device": "ROBOPERA",
        "journal": "Gastrointestinal Endoscopy",
        "year": "2025",
        "type": "First-in-human Prospective Pilot (full article)",
        "notes": "15 consecutive patients at Korea University Medical Center (Jun–Sep 2024). 100% en bloc resection; mean procedure time 28.8 min; dissection speed 48.2 mm²/min.",
        "doi": "10.1016/j.gie.2025.09.012",
        "url": "https://doi.org/10.1016/j.gie.2025.09.012",
    },
    {
        "section": "Clinical Studies & Case Reports (Direct Use of EndoRobotics Devices)",
        "title": "Initial experience with the ROBOPERA platform as a robotic traction device for enhancing submucosal exposure during gastric endoscopic submucosal dissection: a prospective, single-arm pilot study",
        "authors": "Jeon HJ, Choi HS, Kim S, Lee JM, Kim ES, Keum B, Jeen YT, Chun HJ, Lee B",
        "device": "ROBOPERA",
        "journal": "Gastrointestinal Endoscopy",
        "year": "2025",
        "type": "DDW 2025 Conference Abstract (Vol 101, Issue 5, Suppl: S604–S605)",
        "notes": "Preliminary DDW 2025 report of the ROBOPERA first-in-human gastric ESD pilot study.",
        "doi": "10.1016/j.gie.2025.03.844",
        "url": "https://doi.org/10.1016/j.gie.2025.03.844",
    },
    {
        "section": "Clinical Studies & Case Reports (Direct Use of EndoRobotics Devices)",
        "title": "Novel robotic gripper for traction and closure in colorectal endoscopic submucosal dissection",
        "authors": "Kim SH, Choi HS et al.",
        "device": "ROBOPERA-TraCloser (Dual Gripper)",
        "journal": "VideoGIE",
        "year": "2025",
        "type": "Video Case Series",
        "notes": "Two-case demonstration of combined traction-and-closure functions during colorectal ESD.",
        "doi": "10.1016/j.vgie.2024.12.004",
        "url": "https://doi.org/10.1016/j.vgie.2024.12.004",
    },
    {
        "section": "Clinical Studies & Case Reports (Direct Use of EndoRobotics Devices)",
        "title": "Dual-function robotic gripper for traction and closure in gastric endoscopic submucosal dissection: an in vivo porcine model study (with video)",
        "authors": "Kim SH, Seo YC, Keum B, Jeon HJ, Lee JM, Choi HS, Kim ES, Jeen YT, Lee HS, Hwang JH, Chun HJ",
        "device": "Dual-function gripper (ENDOROBOTICS stockholding disclosed in COI)",
        "journal": "Surgical Endoscopy",
        "year": "2025",
        "type": "In Vivo Porcine Study",
        "notes": "Pre-clinical porcine evaluation of combined traction-closure dual gripper (ROBOPERA-TraCloser). Three authors disclose ENDOROBOTICS stockholding.",
        "doi": "10.1007/s00464-025-12182-6",
        "url": "https://doi.org/10.1007/s00464-025-12182-6",
    },

    # =========================================================
    # Precursor platform research (Daehie Hong co-authored,
    # Korea Univ. Mechanical Engineering — same inventor team
    # whose lab spawned the EndoRobotics RoSE/ROBOPERA platform)
    # =========================================================
    {
        "section": "Precursor Platform Research (Daehie Hong / Korea Univ. ME — EndoRobotics Inventor Team)",
        "title": "Endoscopic submucosal dissection using a detachable assistant robot: a comparative in vivo feasibility study (with video)",
        "authors": "Kim SH, Kim BG, Choi HS, Hong D, Jang SH, Hong K, Choi JW, Kim SH, Lee JM, Kim ES, Keum B, Jeen YT, Lee HS, Chun HJ",
        "device": "Detachable assistant robot (ROSE precursor)",
        "journal": "Surgical Endoscopy",
        "year": "2021",
        "type": "Comparative in vivo feasibility (with video), Vol 35(10):5836-5841",
        "notes": "Daehie Hong co-author. Direct precursor to the commercial RoSE Platform — same research team, tendon-sheath mechanism.",
        "doi": "10.1007/s00464-021-08510-1",
        "url": "https://doi.org/10.1007/s00464-021-08510-1",
    },
    {
        "section": "Precursor Platform Research (Daehie Hong / Korea Univ. ME — EndoRobotics Inventor Team)",
        "title": "A novel retractable robotic device for colorectal endoscopic submucosal dissection",
        "authors": "Kim SH, Kim C, Keum B, Im J, Won S, … Hong D, Chun HJ (and colleagues)",
        "device": "Retractable robotic add-on device (ROSE/ROBOPERA sister platform)",
        "journal": "Gut and Liver",
        "year": "2024",
        "type": "Evaluation Study, Vol 18(4):677-685",
        "notes": "Daehie Hong co-author. Concealable robotic add-on for colorectal ESD by the EndoRobotics inventor team.",
        "doi": "10.5009/gnl230280",
        "url": "https://doi.org/10.5009/gnl230280",
    },
    {
        "section": "Precursor Platform Research (Daehie Hong / Korea Univ. ME — EndoRobotics Inventor Team)",
        "title": "A pilot study of endoscopic submucosal dissection using an endoscopic assistive robot in a porcine stomach model",
        "authors": "Kim BG, Choi HS, Park SH, Hong JH, Lee JM, Kim SH, Chun HJ, Hong D, Keum B",
        "device": "REXTER (Revolute joint-based auxiliary transluminal endoscopic robot — earliest ROSE prototype)",
        "journal": "Gut and Liver",
        "year": "2019",
        "type": "Pilot Study, Vol 13(4)",
        "notes": "Daehie Hong co-author. Earliest peer-reviewed pilot from the Korea Univ. team that later spun off EndoRobotics; REXTER is the research-stage predecessor of the RoSE Platform.",
        "doi": "10.5009/gnl18370",
        "url": "https://doi.org/10.5009/gnl18370",
    },

    # =========================================================
    # Comparative / Meta-analytic
    # =========================================================
    {
        "section": "Comparative & Meta-analytic Studies",
        "title": "Robotic-assisted vs non-robotic traction techniques in endoscopic submucosal dissection for malignant gastrointestinal lesions",
        "authors": "(multicenter author group)",
        "device": "Meta-analysis including RoSE Platform",
        "journal": "Frontiers in Oncology",
        "year": "2022",
        "type": "Systematic Review / Meta-analysis",
        "notes": "Pooled comparison of robotic-assisted traction (including ROSE) vs. conventional traction in GI ESD.",
        "doi": "10.3389/fonc.2022.1062357",
        "url": "https://doi.org/10.3389/fonc.2022.1062357",
    },
    {
        "section": "Comparative & Meta-analytic Studies",
        "title": "Advancing surgical frontiers: endorobotic submucosal dissection for enhanced patient outcomes",
        "authors": "(multicenter author group)",
        "device": "Endorobotic ESD (review / clinical)",
        "journal": "Techniques in Coloproctology",
        "year": "2024",
        "type": "Clinical / Review",
        "notes": "Covers endorobotic submucosal dissection landscape and patient outcomes.",
        "doi": "10.1007/s10151-024-03009-y",
        "url": "https://doi.org/10.1007/s10151-024-03009-y",
    },

    # =========================================================
    # Reviews referencing EndoRobotics devices
    # =========================================================
    {
        "section": "Review Articles Citing EndoRobotics Devices",
        "title": "Current state and future development of robotic endoscopy",
        "authors": "(JGES authors)",
        "device": "RoSE Platform referenced",
        "journal": "Digestive Endoscopy (JGES)",
        "year": "2024",
        "type": "Narrative Review",
        "notes": "Surveys robotic endoscopic platforms including EndoRobotics' RoSE Platform.",
        "doi": "10.1111/den.14971",
        "url": "https://doi.org/10.1111/den.14971",
    },
    {
        "section": "Review Articles Citing EndoRobotics Devices",
        "title": "Robotic Platforms for Therapeutic Flexible Endoscopy: A Literature Review",
        "authors": "(MDPI author group)",
        "device": "RoSE Platform / ROBOPERA referenced",
        "journal": "Diagnostics (MDPI)",
        "year": "2024",
        "type": "Literature Review",
        "notes": "Reviews therapeutic flexible endoscopy platforms; cites EndoRobotics products by name.",
        "doi": "10.3390/diagnostics14060595",
        "url": "https://doi.org/10.3390/diagnostics14060595",
    },
    {
        "section": "Review Articles Citing EndoRobotics Devices",
        "title": "Endoluminal robotics",
        "authors": "(Surgery author group)",
        "device": "RoSE Platform referenced",
        "journal": "Surgery",
        "year": "2024",
        "type": "Review",
        "notes": "Endoluminal robotic surgery overview including EndoRobotics' RoSE Platform.",
        "doi": "10.1016/j.surg.2024.07.050",
        "url": "https://doi.org/10.1016/j.surg.2024.07.050",
    },
    {
        "section": "Review Articles Citing EndoRobotics Devices",
        "title": "Endorobots for colonoscopy: design challenges and available technologies",
        "authors": "(Frontiers author group)",
        "device": "Endorobots survey (includes RoSE)",
        "journal": "Frontiers in Robotics and AI",
        "year": "2021",
        "type": "Review",
        "notes": "Design challenges of endorobots for colonoscopy; references EndoRobotics ROSE.",
        "doi": "10.3389/frobt.2021.705454",
        "url": "https://doi.org/10.3389/frobt.2021.705454",
    },
]

# Number entries sequentially at render time.
for i, p in enumerate(PAPERS, 1):
    p["n"] = i


def build_pdf(out_path: Path):
    doc = SimpleDocTemplate(
        str(out_path),
        pagesize=A4,
        leftMargin=20 * mm,
        rightMargin=20 * mm,
        topMargin=18 * mm,
        bottomMargin=18 * mm,
        title="EndoRobotics — Related Peer-Reviewed Publications & DOI Map",
        author="EndoRobotics Dashboard",
    )

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "TitleBig", parent=styles["Title"],
        fontSize=20, leading=24, textColor=colors.HexColor("#0b2545"),
        spaceAfter=6, alignment=TA_LEFT,
    )
    subtitle_style = ParagraphStyle(
        "Subtitle", parent=styles["Normal"],
        fontSize=11, leading=15, textColor=colors.HexColor("#5b7190"),
        spaceAfter=14,
    )
    section_style = ParagraphStyle(
        "Section", parent=styles["Heading2"],
        fontSize=13, leading=17, textColor=colors.HexColor("#0284c7"),
        spaceBefore=14, spaceAfter=8,
    )
    paper_title_style = ParagraphStyle(
        "PaperTitle", parent=styles["Heading3"],
        fontSize=11.5, leading=15, textColor=colors.HexColor("#0b2545"),
        spaceAfter=3,
    )
    author_style = ParagraphStyle(
        "Author", parent=styles["Normal"],
        fontSize=9.5, leading=12, textColor=colors.HexColor("#0b2545"),
        spaceAfter=2,
    )
    meta_style = ParagraphStyle(
        "Meta", parent=styles["Normal"],
        fontSize=9.5, leading=13, textColor=colors.HexColor("#5b7190"),
        spaceAfter=2,
    )
    link_style = ParagraphStyle(
        "Link", parent=styles["Normal"],
        fontSize=9.5, leading=13, textColor=colors.HexColor("#0284c7"),
        spaceAfter=2,
    )
    note_style = ParagraphStyle(
        "Note", parent=styles["Normal"],
        fontSize=9.5, leading=13, textColor=colors.HexColor("#0b2545"),
        spaceAfter=6,
    )

    story = []
    story.append(Paragraph("EndoRobotics — Related Peer-Reviewed Publications & DOI Map", title_style))
    story.append(Paragraph(
        "Peer-reviewed journal publications (full articles, case reports, E-videos, and "
        "DDW/UEGW conference abstracts in indexed supplements) that reference EndoRobotics "
        "Co., Ltd. (Seoul, Korea) devices — ROSE / RoSE Platform, ROBOPERA, ROBOPERA-TraCloser, "
        "EndoRobotics Alligator — or originate from the inventor research group at Korea "
        "University (Daehie Hong, Dept. of Mechanical Engineering). Regulatory filings and "
        "unrelated platforms (PETH, FASTER, etc.) are excluded.",
        subtitle_style,
    ))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#0284c7")))
    story.append(Spacer(1, 10))

    last_section = None
    for p in PAPERS:
        if p["section"] != last_section:
            story.append(Paragraph(p["section"], section_style))
            last_section = p["section"]

        block = []
        block.append(Paragraph(f"<b>{p['n']}.</b> {p['title']}", paper_title_style))
        if p.get("authors"):
            block.append(Paragraph(p["authors"], author_style))
        meta = (
            f"<i>{p['journal']}</i> &nbsp;·&nbsp; {p['year']} "
            f"&nbsp;·&nbsp; {p['type']} &nbsp;·&nbsp; Device: <b>{p['device']}</b>"
        )
        block.append(Paragraph(meta, meta_style))
        doi_text = (
            f'DOI: <a href="{p["url"]}" color="#0284c7">'
            f'<u>{p["doi"]}</u></a>'
        )
        block.append(Paragraph(doi_text, link_style))
        if p.get("notes"):
            block.append(Paragraph(p["notes"], note_style))
        block.append(Spacer(1, 6))
        story.append(KeepTogether(block))

    story.append(Spacer(1, 14))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#9fb3d1")))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "All DOIs are hyperlinked to the publisher landing page "
        "(ScienceDirect / Wiley / Thieme / Frontiers / MDPI / Springer / Gut and Liver). "
        "Included items are peer-reviewed journal publications (including DDW/UEGW "
        "conference abstracts in indexed supplements) that explicitly reference EndoRobotics "
        "devices or were authored by the Daehie Hong inventor group (Korea University ME).",
        meta_style,
    ))

    doc.build(story)


if __name__ == "__main__":
    out = Path.home() / "Downloads" / "EndoRobotics_Related_Papers_DOI_Map.pdf"
    out.parent.mkdir(exist_ok=True)
    build_pdf(out)
    print(f"Saved: {out}")
    print(f"Total entries: {len(PAPERS)}")
