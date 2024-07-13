from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.orm import sessionmaker, declarative_base, Session

SQLALCHEMY_DATABASE_URL = "sqlite:///./skinify.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(256))
    email = Column(String(256))
    quote = Column(String(512))
    image_url = Column(String(512))

class Disease(Base):
    __tablename__ = "disease"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(256))
    symptom = Column(Text())
    remedy = Column(Text())
    image_url = Column(String(256))
    shortcut = Column(String(256))

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def insert_data():
    db = SessionLocal()
    try:
        # Insert data into users table
        # user = User(name="John Doe", email="john@example.com", quote="Live and let live.", image_url="http://example.com/john.jpg")
        # db.add(user)
        
        # Insert data into disease table
        disease = Disease(name="Chickenpox", symptom="Itchy red spots, fever, tiredness, loss of appetite.", remedy="Calamine lotion, oatmeal baths, antiviral medication, rest, and hydration.", image_url="images/chicken_pox.jpg", shortcut="cpox")
        db.add(disease)
        disease = Disease(name="Cowpox", symptom="Red blisters on hands and face, mild fever, swollen lymph nodes.", remedy="Usually self-resolving, symptomatic treatment, pain relief.", image_url="images/cow_pox.jpg", shortcut="copox")
        db.add(disease)
        disease = Disease(name="HFMD", symptom="Fever, sore throat, painful sores in mouth, rash on hands, feet, and buttocks.", remedy="Pain relievers, plenty of fluids, mouthwash or sprays for throat pain.", image_url="images/hfmd.jpg", shortcut="hfm")
        db.add(disease)
        disease = Disease(name="Healthy", symptom="You have no disease", remedy="", image_url="images/healthy.jpeg", shortcut="hlth")
        db.add(disease)
        disease = Disease(name="Measles", symptom="High fever, cough, runny nose, red eyes, Koplik spots, red rash.", remedy="Vitamin A supplements, rest, hydration, fever reducers.", image_url="images/measles.jpg", shortcut="msl")
        db.add(disease)
        disease = Disease(name="Monkeypox", symptom="Fever, headache, muscle aches, back pain, swollen lymph nodes, rash, and lesions.", remedy="Antiviral medications, supportive care, and isolation to prevent spread.", image_url="images/monkey_pox.jpg", shortcut="mpox")
        db.add(disease)
        
        
        db.commit()
    finally:
        db.close()

if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    #insert_data()
